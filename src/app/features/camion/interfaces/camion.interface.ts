export interface ApiResponseList {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      Camion[];
  path:      string;
}
export interface ApiResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      Camion | string;
  path:      string;
}
export interface Camion {
  id:              number;
  placa:           string | null;
  marca:           string | null;
  modelo:          string | null;
  yearFabricacion: number | null;
  estado:          boolean | null;
}
