import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaxpayerType } from '../../interfaces/taxpayer-type.interface';
import { EntidadService } from '../../services/entidad.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentType } from '../../interfaces/document-type.interface';
import { EntityToSave } from '../../interfaces/entidad.interface';

@Component({
  selector: 'app-entity-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{
  @Output() closeDialog = new EventEmitter<void>();
  @Output() refreshEntities = new EventEmitter<void>();

  @Input()
  entityDialog!:boolean;

  public documentType : DocumentType[] = [];
  public taxpayerType : TaxpayerType[]=[];

  public entityForm = new FormGroup({
    id:             new FormControl<number>(0),
    documentNumber: new FormControl<string>('', { nonNullable: true }),
    legalName:      new FormControl<string>('', { nonNullable: true }),
    commercialName: new FormControl<string>('', { nonNullable: true }),
    address:        new FormControl<string>(''),
    phoneNumer:     new FormControl<string>(''),
    documentTypeId: new FormControl<number>(0, { nonNullable: true }),
    taxpayerTypeId: new FormControl<number>(0, { nonNullable: true }),
  })
  constructor(private entidadService : EntidadService, private messageService: MessageService, private confirmationService: ConfirmationService){}

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
  onSubmit(): void{
    if (this.entityForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete los campos obligatorios' });
      return;
    }

    const entity = this.entityForm.value as EntityToSave;
    console.log(entity);
      if(entity.id){
        this.entidadService.updateEntity(entity.id, entity).subscribe(() => {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad actualizada' });
              this.refreshEntities.emit();
              this.closeDialog.emit();
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
        },
/*         (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la entidad' });
        } */
      );

  }
}
