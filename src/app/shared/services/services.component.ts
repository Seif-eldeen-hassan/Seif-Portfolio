import { NgFor } from '@angular/common';
import { Component ,Input } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})

export class ServicesComponent {
  @Input() servicesData!: any[];
  ServiceNames: any[] = [];
  ServiceDesc: any[] = [];
  ServiceIcons: any[] = [];
  ServicesDescription! :string;

  ngOnInit() {
      this.ServicesDescription = this.servicesData[1][0]
      for(let i = 0 ; i < this.servicesData.length-1 ; i++ ){
          this.ServiceNames[i] = this.servicesData[i+1][1];
          this.ServiceDesc[i] = this.servicesData[i+1][2];
          this.ServiceIcons[i] = this.servicesData[i+1][3];
      }
  }
}
