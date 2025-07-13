
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { Menu } from 'primeng/menu';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, Menu, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Navegación',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['']);
            }
          },
          {
            label: 'Empleados',
            icon: 'pi pi-users',
            command: () => {
              this.router.navigate(['/empleados']);
            }
          }
        ]
      }
    ];
  }
}

