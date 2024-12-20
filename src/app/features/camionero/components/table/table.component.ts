import { Component, Input } from '@angular/core';
import { ApiResponse, CamioneroToSave } from '../../interface/camionero.interface';
import { CamioneroService } from '../../service/camionero.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-camionero-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
 @Input()
  public responseApi!: ApiResponse;

  public selectedEntity!: CamioneroToSave;

  entityDialog: boolean = false;

  entityDialogDelete: boolean = false;

  constructor(private camioneroService : CamioneroService, private messageService: MessageService, private confirmationService: ConfirmationService){}

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
    this.camioneroService.getPageableCamiones(pageNo, pageSize, sortBy, sortDir)
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
    this.camioneroService.getPageableCamiones().subscribe((responseApi) => {
      this.responseApi = responseApi;
    });
  }
  editEntidad(entity: any): void {
    console.log(entity);
    this.entityDialog = true;
    this.selectedEntity = {...entity}; // Asegúrate de tener esta propiedad en el componente
  }
  onDeleteEntity(entity: CamioneroToSave): void {
    console.log(entity);
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar el camionero con el dni "${entity.dni}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.camioneroService.deleteCamionero(entity.id).subscribe(
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
