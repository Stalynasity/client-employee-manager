import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../core/Services/employee.service';
import { FormsModule } from '@angular/forms';
import { EmpleadoMasJovenResponseDTO, EmpleadoSalarioMasAltoResponseDTO } from '../../core/Models/EmpleadoDTO';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    PanelModule,
    ToastModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [MessageService]
})
export class DashboardComponent {
  salarioMasAlto?: EmpleadoSalarioMasAltoResponseDTO;
  edadMasBaja?: EmpleadoMasJovenResponseDTO;
  empleadosUltimoMes?: number;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  consultarSalarioMasAlto() {
    this.employeeService.getEmpleadoConSalarioMasAlto().subscribe({
      next: res => {
        this.salarioMasAlto = res.data;
        this.edadMasBaja = undefined;
        this.empleadosUltimoMes = undefined;
        this.showSuccess('Salario más alto consultado correctamente');
      },
      error: () => this.showError('Error al consultar salario más alto')
    });
  }

  consultarEdadMasBaja() {
    this.employeeService.getEmpleadoMasJoven().subscribe({
      next: res => {
        this.edadMasBaja = res.data;
        this.salarioMasAlto = undefined;
        this.empleadosUltimoMes = undefined;
        this.showSuccess('Edad más baja consultada correctamente');
        console.log(this.edadMasBaja);
      },
      error: () => this.showError('Error al consultar edad más baja')
    });
  }

  consultarIngresosUltimoMes() {
    this.employeeService.getEmpleadosUltimoMes().subscribe({
      next: res => {
        this.empleadosUltimoMes = res.data;
        this.salarioMasAlto = undefined;
        this.edadMasBaja = undefined;
        this.showSuccess('Consulta de ingresos del último mes exitosa');
      },
      error: () => this.showError('Error al consultar ingresos')
    });
  }

  showSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail });
  }

  showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }
}
