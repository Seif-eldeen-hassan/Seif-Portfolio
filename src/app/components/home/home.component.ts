import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SheetService } from '../../shared/sheet.service';
import { GetInTouchComponent } from '../../shared/get-in-touch/get-in-touch.component';
import { LookWhatIDidComponent } from '../../shared/look-what-i-did/look-what-i-did.component';
import { ServicesComponent } from '../../shared/services/services.component';
import { SkillsComponent } from '../../shared/skills/skills.component';
import { AchievementComponent } from '../../shared/achievement/achievement.component';
import { AboutSectionComponent } from '../../shared/about-section/about-section.component';
import { NgIf, NgStyle } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GetInTouchComponent, LookWhatIDidComponent, ServicesComponent, SkillsComponent, AchievementComponent , AboutSectionComponent , NgIf , LoaderComponent,NgStyle],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  @ViewChild(AboutSectionComponent) aboutSection!: AboutSectionComponent;

  aboutData: any[] = [];
  achievementsData: any[] = [];
  MySkillsData: any[] = [];
  ServicesData: any[] = [];
  PortfolioData: any[] = [];
  ContactData: any[] = [];
  JobDecription! : string;
  FirstPersonalImage!: string;
  SecondPersonalImage!: string;
  allSectionsLoaded = false;
  CenteredTitle = true;

  constructor(private sheetService: SheetService) {}

  ngOnInit() {
    forkJoin({
      about: this.sheetService.getSheetData('About'),
      achievements: this.sheetService.getSheetData('Projects-type'),
      skills: this.sheetService.getSheetData('MySkills'),
      services: this.sheetService.getSheetData('Services'),
      portfolio: this.sheetService.getSheetData('Portfolio'),
      contact: this.sheetService.getSheetData('Contact'),

    }).subscribe(({ about, achievements, skills , services , portfolio, contact}) => {
      this.aboutData        = about.values;
      this.achievementsData = achievements.values;
      this.MySkillsData = skills.values;
      this.ServicesData = services.values;
      this.PortfolioData = portfolio.values;
      this.ContactData = contact.values;
      this.JobDecription = this.aboutData[1][2];
      this.FirstPersonalImage = this.aboutData[1][3];
      this.SecondPersonalImage = this.aboutData[2][3];
      this.allSectionsLoaded = true;
    });
  }

  scroll_to_project() {
    this.aboutSection.scroll_to_project();
  }

}
