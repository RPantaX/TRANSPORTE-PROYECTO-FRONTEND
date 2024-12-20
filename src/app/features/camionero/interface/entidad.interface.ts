export interface EntidadResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      Entidad[];
  path:      string;
}

export interface Entidad {
  id:             number;
  documentNumber: string;
  legalName:      string;
  commercialName: string;
  address:        string;
  phone:          string;
}
