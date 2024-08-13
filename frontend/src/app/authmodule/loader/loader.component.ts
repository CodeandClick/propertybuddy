import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';



// Import library module
import { NgxSpinnerModule, NgxSpinnerService  } from "ngx-spinner";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgxSpinnerModule, CommonModule ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
  }
}
