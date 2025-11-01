export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  telefono: string;
}

export interface CreateUsuarioRequest {
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  telefono: string;
}

export interface UpdateUsuarioRequest {
  nombre?: string;
  apellido?: string;
  edad?: number;
  email?: string;
  telefono?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}