
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CamioneroToSave } from '../../interface/camionero.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneValidator } from '../../../validations/validations.features';
import { CamioneroService } from '../../service/camionero.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Entidad } from '../../interface/entidad.interface';
import { Camion } from '../../../camion/interfaces/camion.interface';

@Component({
  selector: 'app-camionero-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{
    @Output() closeDialog = new EventEmitter<void>();
    @Output() refreshEntities = new EventEmitter<void>();
    @Output() dialogToDelete = new EventEmitter<void>();
    @Input() entity!: CamioneroToSave;
    @Input() entityDialog!:boolean;
    isEditMode: boolean = false;

    public entidad : Entidad[] = [];
    public camion : Camion[]=[];
    public entityForm = new FormGroup({
      id: new FormControl<number>(0),
      dni: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        phoneValidator
      ]),
      direccion: new FormControl<string>(''),
      telefono: new FormControl<string>('', [
        phoneValidator,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      edad: new FormControl<number>(0),
      idEntidad: new FormControl<number>(0,),
      idCamion: new FormControl<number>(0,),
      nroLicencia: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        phoneValidator
      ])
    });

    constructor(
      private camioneroService : CamioneroService,
      private messageService: MessageService
    ){}

    get currentEntity(): CamioneroToSave{
      const entity = this.entityForm.value as CamioneroToSave
      return entity;
    }

    ngOnInit(): void {
      this.camioneroService.getEntidadList()
        .subscribe((entidades) => {
          this.entidad = entidades.data;
        });
    this.camioneroService.getCamionList()
        .subscribe((camiones) => {
          this.camion = camiones.data;
        });
    }
    ngOnChanges(): void {
      if (this.entity) {
        // Si hay datos en la entidad, los carga en el formulario
        this.entityForm.patchValue(this.entity);
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
    onSubmit(): void {
      if (this.entityForm.invalid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete los campos obligatorios y verifique que la información sea válida.' });
        return;
      }

      const entity = this.entityForm.value as CamioneroToSave;

      if (entity.id) {
        // Modo edición
        this.camioneroService.updateCamionero(entity.id, entity).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad actualizada' });
            this.refreshEntities.emit();
            this.closeDialog.emit();
            this.isEditMode = false;
            this.entityForm.reset();
          },
          (error) => this.handleError(error) // Manejar errores
        );
        return;
      }

      // Modo creación
      this.camioneroService.saveCamionero(entity).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad creada' });
          this.refreshEntities.emit();
          this.closeDialog.emit();
          this.entityForm.reset();
        },
        (error) => this.handleError(error) // Manejar errores
      );
    }

    // Manejo del error
    private handleError(error: any): void {
      if (error.status === 406) {
        const message = error.error.message || 'Error en la solicitud';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error inesperado. Intente nuevamente.' });
      }
    }

    onCancel(): void {
      this.isEditMode = false; // Cambiar a "modo creación"
      this.entityForm.reset(); // Restablecer el formulario
      this.closeDialog.emit(); // Emitir el evento de cierre
    }

}
