export interface ResponseEntidades {
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
export interface Data {
  responseEntidadList: ResponseEntidadList[];
  pageNumber:          number;
  pageSize:            number;
  totalPages:          number;
  totalElements:       number;
  end:                 boolean;
}

export interface ResponseEntidadList {
  id:                   number;
  documentNumber:       string;
  legalName:            string;
  commercialName:       string;
  address:              string;
  phone:                string;
  taxpayerType:         string;
  documentTypeResponse: DocumentTypeResponse;
}

export interface DocumentTypeResponse {
  code:        string;
  name:        string;
  description: string;
}

export interface EntityToSave{
  id:                   number;
  documentNumber:       string;
  legalName:            string;
  commercialName:       string;
  address:              string;
  phone:                string;
  documentTypeResponse: DocumentTypeResponse;
  taxpayerTypeName:     string;
  documentTypeId:         number;
  taxpayerTypeId: number;
}
