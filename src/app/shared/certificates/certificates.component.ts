import { NgFor, NgStyle } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [NgFor,NgStyle],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {
  @Input() certificatesData!: any[];

   CertificatesImage: any[] = [];
   CertificatesTitle: any[] = [];
   CertificatesSource: any[] = [];

   ngOnInit() {
       for(let i = 0 ; i < this.certificatesData.length-1 ; i++ ){
           this.CertificatesImage[i] = this.certificatesData[i+1][0];
           this.CertificatesTitle[i] = this.certificatesData[i+1][1];
           this.CertificatesSource[i] = this.certificatesData[i+1][2];
       }

   }
}
