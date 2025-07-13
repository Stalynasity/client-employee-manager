import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoMasJovenResponseDTO, EmpleadoRequestDTO, EmpleadoResponseDTO, EmpleadoSalarioMasAltoResponseDTO } from '../Models/EmpleadoDTO';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../Models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) {}

  createEmployee(departmentId: number, empleado: EmpleadoRequestDTO): Observable<BaseResponse<EmpleadoResponseDTO>> {
    return this.http.post<BaseResponse<EmpleadoResponseDTO>>(
      `${this.baseUrl}/create/${departmentId}`,
      empleado
    );
  }

  deleteEmployee(employeeId: number): Observable<BaseResponse<void>> {
    return this.http.post<BaseResponse<void>>(
      `${this.baseUrl}/delete/${employeeId}`, {}
    );
  }

  getEmpleadoMasJoven(): Observable<BaseResponse<EmpleadoMasJovenResponseDTO>> {
    return this.http.get<BaseResponse<EmpleadoMasJovenResponseDTO>>(
      `${this.baseUrl}/lowerAge`
    );
  }

  getEmpleadoConSalarioMasAlto(): Observable<BaseResponse<EmpleadoSalarioMasAltoResponseDTO>> {
    return this.http.get<BaseResponse<EmpleadoSalarioMasAltoResponseDTO>>(
      `${this.baseUrl}/highestSalary`
    );
  }

  getEmpleadosUltimoMes(): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(
      `${this.baseUrl}/countLastMonth`
    );
  }
}
