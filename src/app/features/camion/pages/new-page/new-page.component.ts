import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camion } from '../../interfaces/camion.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CamionService } from '../../services/camion.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-camion-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent{
    @Output() closeDialog = new EventEmitter<void>();
    @Output() refreshEntities = new EventEmitter<void>();
    @Output() dialogToDelete = new EventEmitter<void>();
    @Input() entity!: Camion;
    @Input() entityDialog!:boolean;
    isEditMode: boolean = false;

    public entityForm = new FormGroup({
      id: new FormControl<number>(0),
      placa: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
      marca: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      modelo: new FormControl<string>('', [
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
      estado: new FormControl<boolean>(false),
      yearFabricacion: new FormControl<number>(0, [
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
    });

    constructor(
      private camionService : CamionService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ){}

    get currentEntity(): Camion{
      const entity = this.entityForm.value as Camion
      return entity;
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

      const entity = this.entityForm.value as Camion;

      if (entity.id) {
        // Modo edición
        console.log(entity);
        this.camionService.updateCamion(entity.id, entity).subscribe(
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
      this.camionService.saveCamion(entity).subscribe(
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
