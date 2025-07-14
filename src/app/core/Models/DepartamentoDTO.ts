export interface DepartamentoRequestDTO {
  nombre: string;
  descripcion: string;
}

export interface DepartamentoResponseDTO {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface DepartamentoModal {
  id: number;
  nombre: string;
  estado: string;
}
