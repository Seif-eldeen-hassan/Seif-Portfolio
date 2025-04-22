import { Component } from '@angular/core';
import { AchievementComponent } from '../../shared/achievement/achievement.component';
import { ServicesComponent } from '../../shared/services/services.component';
import { GetInTouchComponent } from '../../shared/get-in-touch/get-in-touch.component';
import { SheetService } from '../../shared/sheet.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { forkJoin } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [AchievementComponent,ServicesComponent,GetInTouchComponent,LoaderComponent,NgIf],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})

export class ServiceComponent {

  achievementsData: any[] = [];
  ServicesData: any[] = [];
  ContactData: any[] = [];
  allSectionsLoaded = false;

  constructor(private sheetService: SheetService) {}

  ngOnInit() {
    forkJoin({
      achievements: this.sheetService.getSheetData('Projects-type'),
      services: this.sheetService.getSheetData('Services'),
      contact: this.sheetService.getSheetData('Contact'),

    }).subscribe(({ achievements,  services , contact}) => {
      this.achievementsData = achievements.values;
      console.log(this.achievementsData)
      this.ServicesData = services.values;
      this.ContactData = contact.values;
      this.allSectionsLoaded = true;
    });
  }

}
