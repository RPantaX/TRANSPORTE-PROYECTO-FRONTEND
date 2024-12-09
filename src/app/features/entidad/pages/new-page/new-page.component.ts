import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxpayerType } from '../../interfaces/taxpayer-type.interface';
import { EntidadService } from '../../services/entidad.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentType } from '../../interfaces/document-type.interface';
import { DocumentTypeResponse, EntityToSave } from '../../interfaces/entidad.interface';
import { phoneValidator } from '../../../validations/validations.features';

@Component({
  selector: 'app-entity-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{
  @Output() closeDialog = new EventEmitter<void>();
  @Output() refreshEntities = new EventEmitter<void>();
  @Output() dialogToDelete = new EventEmitter<void>();
  @Input() entity!: EntityToSave;
  @Input() entityDialog!:boolean;
  isEditMode: boolean = false;

  public documentType : DocumentType[] = [];
  public taxpayerType : TaxpayerType[]=[];
  public documentName : string = "";
  public entityForm = new FormGroup({
    id: new FormControl<number>(0),
    documentNumber: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      phoneValidator
    ]),
    legalName: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    commercialName: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.maxLength(100)
    ]),
    address: new FormControl<string>(''),
    phone: new FormControl<string>('', [
      phoneValidator,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    documentTypeId: new FormControl<number>(0,),
    taxpayerTypeId: new FormControl<number>(0,),
    documentTypeResponse: new FormControl<DocumentTypeResponse>({ code: '', name: '', description: '' }),
    taxpayerType: new FormControl<string>(''),
  });

  constructor(
    private entidadService : EntidadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  get currentEntity(): EntityToSave{
    const entity = this.entityForm.value as EntityToSave
    return entity;
  }

  ngOnInit(): void {
    this.entidadService.getDocumentTypeList()
      .subscribe((documentTypeResponse) => {
        this.documentType = documentTypeResponse.data;
      });
  this.entidadService.getTaxpayerTypeList()
      .subscribe((TaxpayerTypeResponse) => {
        this.taxpayerType = TaxpayerTypeResponse.data;
      });
  }
  ngOnChanges(): void {
    if (this.entity) {
      // Si hay datos en la entidad, los carga en el formulario
      this.entityForm.patchValue(this.entity);
      this.documentName = this.entity.documentTypeResponse.name;
      this.isEditMode = true;
    } else {
      // Si no hay datos, reinicia el formulario
      this.entityForm.reset();
      this.isEditMode = false;
    }
  }
  ngOnDestroy(): void {
    this.entityForm.reset();
  }
  onSubmit(): void{
    if (this.entityForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete los campos obligatorios y verifique que la información sea válida.' });
      return;
    }

    const entity = this.entityForm.value as EntityToSave;
    console.log(entity);
      if(entity.id){
        this.entidadService.updateEntity(entity.id, entity).subscribe(() => {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad actualizada' });
              this.refreshEntities.emit();
              this.closeDialog.emit();
              this.isEditMode = false;
              this.entityForm.reset();
            },
/*             (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la entidad' });
            } */
          );
          return;
      }
      this.entidadService.saveEntity(entity).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad creada' });
          this.refreshEntities.emit();
          this.closeDialog.emit();
          this.entityForm.reset();
        },
/*         (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la entidad' });
        } */
      );
  }
  onDeleteEntity() {
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar "${this.entity.legalName}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entidadService.deleteEntity(this.entity.id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Entidad eliminada correctamente.',
            });
            this.refreshEntities.emit(); // Notifica al padre que recargue los datos
            this.closeDialog.emit(); // Cierra el diálogo
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar la entidad.',
            });
          }
        );
      }
    });
  }

  onCancel(): void {
    this.isEditMode = false; // Cambiar a "modo creación"
    this.entityForm.reset(); // Restablecer el formulario
    this.closeDialog.emit(); // Emitir el evento de cierre
  }
}
