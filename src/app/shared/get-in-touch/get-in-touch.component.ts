import { NgFor } from '@angular/common';
import { Component ,Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.css'
})
export class GetInTouchComponent {
  @Input() contactData!: any[];

   ContactDesc!: string;
   Emails: any[] = [];
   PhoneNumbers: any[] = [];
   Locations: any[] = [];

   ngOnInit() {
       this.ContactDesc = this.contactData[1][0]
       for(let i = 0 ; i < this.contactData.length-1 ; i++ ){
           this.Emails[i] = this.contactData[i+1][1];
           this.PhoneNumbers[i] = this.contactData[i+1][2];
           this.Locations[i] = this.contactData[i+1][3];
       }
   }
}
