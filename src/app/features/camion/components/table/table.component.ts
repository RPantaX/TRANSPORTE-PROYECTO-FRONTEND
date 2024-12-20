import { Component, Input, OnInit } from '@angular/core';
import { ApiResponseList, Camion } from '../../interfaces/camion.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CamionService } from '../../services/camion.service';

@Component({
  selector: 'app-camion-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent implements OnInit{
  @Input()
    public apiResponseList!: ApiResponseList;
    public selectedEntity!: Camion;

    entityDialog: boolean = false;

    entityDialogDelete: boolean = false;

    constructor(private camionService : CamionService, private messageService: MessageService, private confirmationService: ConfirmationService){}

    ngOnInit(): void {
      if(!this.apiResponseList) throw Error('responseApi is required');
    }
    openNew() {
      this.entityDialog = true;
    }

    hideDialog() {
      this.entityDialog = false;
    }
    openDialogDelete(){
      this.entityDialogDelete = true
    }
    loadEntities() {
      this.camionService.getCamionList().subscribe((responseApiList) => {
        this.apiResponseList = responseApiList;
      });
    }
    editEntidad(entity: any): void {
      console.log(entity);
      this.entityDialog = true;
      this.selectedEntity = {...entity}; // Asegúrate de tener esta propiedad en el componente
    }
    onDeleteEntity(entity: Camion): void {
      console.log(entity);
      this.confirmationService.confirm({
        message: `¿Estás seguro que deseas eliminar "${entity.placa}"?`,
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.camionService.deleteCamion(entity.id).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Entidad eliminada correctamente.',
              });
              this.loadEntities(); // Notifica al padre que recargue los datos
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error al eliminar la entidad.',
              });
            }
          );
        },
      });
    }
}
