import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentoRequestDTO, DepartamentoResponseDTO, DepartamentoModal } from '../Models/DepartamentoDTO';
import { BaseResponse } from '../Models/BaseResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = environment.apiUrl + '/department';

  constructor(private http: HttpClient) {}

  createDepartment(dept: DepartamentoRequestDTO): Observable<BaseResponse<DepartamentoResponseDTO>> {
    return this.http.post<BaseResponse<DepartamentoResponseDTO>>(`${this.baseUrl}/create`, dept);
  }

  deleteDepartment(id: number): Observable<BaseResponse<void>> {
    return this.http.post<BaseResponse<void>>(`${this.baseUrl}/delete/${id}`, {});
  }

  listaDepa(): Observable<BaseResponse<Array<DepartamentoModal>>> {
    return this.http.get<BaseResponse<Array<DepartamentoModal>>>(`${this.baseUrl}/listdepartamento`);
  }

}
