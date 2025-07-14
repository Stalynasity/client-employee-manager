import { DepartamentoResponseDTO } from "./DepartamentoDTO";

export interface Empleado {
  id: number;
  nombres: string;
  apellidos: string;
  edad: number;
  rol: string;
  salario: number;
  fechaIngreso: string;
  fechaSalida: string | null;
  estado: string;
  departamento: DepartamentoResponseDTO;
}

export interface EmpleadoRequestDTO {
  nombres: string;
  apellidos: string;
  edad: number;
  rol: string;
  salario: number;
  fechaIngreso: string; // formato ISO: 'YYYY-MM-DD'
  fechaSalida?: string | null;
  estado: number;
}

export interface EmpleadoResponseDTO {
  id: number;
  nombres: string;
  apellidos: string;
  rol: string;
  salario: number;
  estado: string;
  departamento: string;
}

export enum EstadoEmpleado {
  A = 1,
  I = 0
}

export interface EmpleadoMasJovenResponseDTO {
  nombres: string;
  apellidos: string;
  edad: number;
}

export interface EmpleadoSalarioMasAltoResponseDTO {
  nombres: string;
  apellidos: string;
  salario: number;
}
