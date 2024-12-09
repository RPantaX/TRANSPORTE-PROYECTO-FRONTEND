export interface User {
  id:    number;
  username:  string;
  password: string;
  isAdmin: boolean;
  phone: string;
}
export interface ApiResponse {
  status:    string;
  message:   string;
  timestamp: Date;
  data:      Data;
  path:      string;
}

export interface Data {
  username: string;
  phone:    string;
}
