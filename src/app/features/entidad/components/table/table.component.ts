import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityToSave, ResponseEntidades } from '../../interfaces/entidad.interface';
import { EntidadService } from '../../services/entidad.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-entidad-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent implements OnInit{

  @Input()
  public responseApi!: ResponseEntidades;


  public selectedEntity!: EntityToSave;

  entityDialog: boolean = false;

  entityDialogDelete: boolean = false;

  constructor(private entidadService : EntidadService, private messageService: MessageService, private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    if(!this.responseApi) throw Error('responseApi is required');
  }

  onLazyLoad(event: any): void {
    var i = event.first / event.rows;
    const pageNo =  i ? i: 0
    const pageSize = event.rows;
    const sortBy = event.sortField || 'id';
    const sortDir = event.sortOrder === 1 ? 'asc' : 'desc';
    console.log(pageSize)
    this.entidadService.getPageableEntities(pageNo, pageSize, sortBy, sortDir)
      .subscribe((responseApi) => {
        this.responseApi = responseApi;
      });
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
    this.entidadService.getPageableEntities().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
  editEntidad(entity: any): void {
    console.log(entity);
    this.entityDialog = true;
    this.selectedEntity = {...entity}; // Asegúrate de tener esta propiedad en el componente
  }
  onDeleteEntity(entity: EntityToSave): void {
    console.log(entity);
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar "${entity.legalName}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entidadService.deleteEntity(entity.id).subscribe(
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
