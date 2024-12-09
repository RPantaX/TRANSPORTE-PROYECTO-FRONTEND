export interface TaxpayerTypeResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      TaxpayerType[];
  path:      string;
}

export interface TaxpayerType {
  id:   number;
  name: string;
}
