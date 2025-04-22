import { Component } from '@angular/core';
import { GetInTouchComponent } from '../../shared/get-in-touch/get-in-touch.component';
import { forkJoin } from 'rxjs';
import { SheetService } from '../../shared/sheet.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { CertificatesComponent } from '../../shared/certificates/certificates.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [GetInTouchComponent,LoaderComponent,NgIf,NgFor,NgStyle,CertificatesComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent {

  constructor(private sheetService: SheetService) {}
  ContactData: any[] = [];
  AboutData: any[] = [];
  CertificatesData: any[] = [];

  WhoAmIDescription! :string;
  WhoAmI_Image! :string;
  EducationDescription! :string;
  WhoAmIList: any[] = [];
  EducationList: any[] = [];
  SkillNames: any[] = [];
  SkillDesc: any[] = [];
  allSectionsLoaded = false;

 ngOnInit() {
    forkJoin({
      contact: this.sheetService.getSheetData('Contact'),
      aboutData: this.sheetService.getSheetData('about-page'),
      certificates: this.sheetService.getSheetData('certificates'),


    }).subscribe(({contact,aboutData,certificates}) => {
      this.ContactData = contact.values;
      this.AboutData = aboutData.values;
      this.CertificatesData = certificates.values;
      this.allSectionsLoaded = true;

      this.WhoAmIDescription = this.AboutData[1][0];
      this.EducationDescription = this.AboutData[1][3];
      this.WhoAmI_Image = this.AboutData[1][2];
      for(let i = 0 ; i < this.AboutData.length-1 ; i++){
        if(!this.AboutData[i+1][1]){
          break;
        }
        this.WhoAmIList[i] = this.AboutData[i+1][1];
      }

      for(let i = 0 ; i < this.AboutData.length-1 ; i++){
        if(!this.AboutData[i+1][4]){
          break;
        }
        this.EducationList[i] = this.AboutData[i+1][4];
      }

      for(let i = 0 ; i < this.AboutData.length-1 ; i++){
        if(!this.AboutData[i+1][5]){
          break;
        }
        this.SkillNames[i] = this.AboutData[i+1][5];
      }

      for(let i = 0 ; i < this.AboutData.length-1 ; i++){
        if(!this.AboutData[i+1][6]){
          break;
        }
        this.SkillDesc[i] = this.AboutData[i+1][6];
      }

    });


  }
}
