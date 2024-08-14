import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterModule],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.css'
})
export class RoleSelectComponent {

}
