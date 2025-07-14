import { Component, OnInit } from '@angular/core';
import { DepartamentoRequestDTO } from '../../core/Models/DepartamentoDTO';
import { EmployeeService } from '../../core/Services/employee.service';
import { DepartmentService } from '../../core/Services/department.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Empleado } from '../../core/Models/EmpleadoDTO';
import { BaseResponse } from '../../core/Models/BaseResponse';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css',
  providers: [MessageService],
})
export class DepartamentosComponent implements OnInit {
  nuevoDepartamento: DepartamentoRequestDTO = {
    nombre: '',
    descripcion: 'ACTIVO',
  };
  idEmpleadoEliminar: number | null = null;
idDeptoEliminar: number | null = null;
  departamentos: { id: number; nombre: string }[] = [];
  empleados: Empleado[] = [];

  constructor(
    private deptoService: DepartmentService,
    private empService: EmployeeService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
  this.deptoService.listaDepa().subscribe({
    next: (res) => {
      this.departamentos = res.data.filter(dep => dep.estado === 'ACTIVO');
    },
    error: (err) => console.error('Error al cargar departamentos', err),
  });

  this.empService.getListaEmpleados().subscribe({
    next: (res) => {
      this.empleados = res.data.filter(emp => emp.estado === 'ACTIVO');
    },
    error: (err) => console.error('Error al cargar empleados', err),
  });
}

  crearDepartamento(): void {
    if (!this.nuevoDepartamento.nombre) return;

    this.deptoService.createDepartment(this.nuevoDepartamento).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Departamento creado',
        });
        this.nuevoDepartamento = { nombre: '', descripcion: 'lalala' };
        this.cargarDatos();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error al crear departamento',
        }),
    });
  }

  eliminarDepartamento(): void {
    if (!this.idDeptoEliminar) return;
    this.deptoService.deleteDepartment(this.idDeptoEliminar).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Departamento eliminado',
        });
        console.log('Departamento ID:', this.idDeptoEliminar);
        this.idDeptoEliminar = 0;
        this.cargarDatos();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error al eliminar departamento',
        }),
    });
  }

  eliminarEmpleado(): void {
    if (!this.idEmpleadoEliminar) return;

    this.empService.deleteEmployee(this.idEmpleadoEliminar).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Empleado eliminado',
        });
        console.log('Empleado ID:', this.idEmpleadoEliminar);
        this.idEmpleadoEliminar = 0;
        this.cargarDatos();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error al eliminar empleado',
        }),
    });
  }
}
