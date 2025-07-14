import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { EmployeeService } from '../../core/Services/employee.service';
import { Empleado, EmpleadoRequestDTO } from '../../core/Models/EmpleadoDTO';
import { DepartmentService } from '../../core/Services/department.service';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { BaseResponse } from '../../core/Models/BaseResponse';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    FluidModule,
    DatePickerModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    ToastModule,
    SelectModule,
    TableModule,
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
  providers: [MessageService],
})
export class EmpleadosComponent implements OnInit {
  empleadoForm!: FormGroup;
  empleados: Empleado[] = [];

  estadoOptions = [
    { label: 'ACTIVO', value: 1 },
    { label: 'INACTIVO', value: 0 },
  ];

  departamentos: { id: number; nombre: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(18)]],
      rol: [''],
      salario: [null, [Validators.required, Validators.min(0)]],
      fechaIngreso: [null, Validators.required],
      fechaSalida: [null],
      estado: [{ value: 1, disabled: true }],
      departamentoId: [null, Validators.required],
    });

    this.departmentService.listaDepa().subscribe({
    next: (res) => {
      this.departamentos = res.data.filter(dep => dep.estado === 'A');
    },
    error: (err) => console.error('Error al cargar departamentos', err),
  });

    this.employeeService.getListaEmpleados().subscribe({
      next: (res: BaseResponse<Empleado[]>) => {
        this.empleados = res.data;
      },
      error: (err) => {
        console.error('Error al cargar empleados', err);
      },
    });
  }

  crearEmpleado(): void {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    const formValue = this.empleadoForm.getRawValue();

    console.log('Form Value:', formValue);

    const empleado: EmpleadoRequestDTO = {
      ...formValue,
      fechaIngreso: this.convertDate(formValue.fechaIngreso),
      fechaSalida: formValue.fechaSalida
        ? this.convertDate(formValue.fechaSalida)
        : null,
    };

    this.employeeService
      .createEmployee(formValue.departamentoId, empleado)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Empleado creado correctamente',
          });

          const estadoActual = this.empleadoForm.get('estado')?.value;
          this.empleadoForm.reset({ estado: estadoActual }); // conserva solo el estado
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un problema al crear el empleado',
          });
        },
      });
  }

  preventMinus(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  private convertDate(date: Date): string {
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }

  listaDepartamentos(): void {
    this.departmentService.listaDepa().subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Departamentos:', res.data);
        } else {
          console.error('Error al obtener departamentos:', res.message);
        }
      },
      error: (err) =>
        console.error('Error en la solicitud de departamentos:', err),
    });
  }
}
