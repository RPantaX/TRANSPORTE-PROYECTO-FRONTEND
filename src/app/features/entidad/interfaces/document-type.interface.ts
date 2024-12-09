export interface DocumentTypeResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      DocumentType[];
  path:      string;
}

export interface DocumentType {
  id:          number;
  code:        string;
  name:        string;
  description: string;
}
