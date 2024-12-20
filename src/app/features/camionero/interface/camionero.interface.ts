export interface ApiResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      Data;
  path:      string;
}

export interface ResponseApiToChanges {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      string;
  path:      string;
}

export interface CamioneroToSave {
  id:          number;
  dni:         string;
  direccion:   string;
  telefono:    string;
  edad:        number;
  idEntidad:   number;
  idCamion:    number;
  nroLicencia: string;
}


export interface Data {
  responseCamioneroList: ResponseCamioneroList[];
  pageNumber:            number;
  pageSize:              number;
  totalPages:            number;
  totalElements:         number;
  end:                   boolean;
}

export interface ResponseCamioneroList {
  id:          number;
  dni:         string;
  nombres:     string;
  apellidos:   string;
  direccion:   string;
  telefono:    string;
  edad:        number;
  nroLicencia: string;
  camion:      Camion;
  entidad:     Entidad;
}

export interface Camion {
  id:              number;
  placa:           string;
  marca:           string;
  modelo:          string;
  yearFabricacion: number;
  estado:          boolean;
}

export interface Entidad {
  id:             number;
  documentNumber: string;
  legalName:      string;
  commercialName: string;
  address:        string;
  phone:          string;
}
