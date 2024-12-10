export interface ApiResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      ContribuitorType[];
  path:      string;
}

export interface ContribuitorType {
  id:   number;
  name: string;
}
