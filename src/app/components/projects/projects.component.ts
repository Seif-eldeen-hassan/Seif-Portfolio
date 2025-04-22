import { Component } from '@angular/core';
import { LookWhatIDidComponent } from '../../shared/look-what-i-did/look-what-i-did.component';
import { SheetService } from '../../shared/sheet.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { forkJoin } from 'rxjs';
import { NgIf } from '@angular/common';
import { GetInTouchComponent } from '../../shared/get-in-touch/get-in-touch.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LookWhatIDidComponent,LoaderComponent,NgIf,GetInTouchComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    PortfolioData: any[] = [];
    ContactData: any[] = [];
    achievementsData: any[] = [];
    allSectionsLoaded = false;

    constructor(
      private sheetService: SheetService,
      private route: ActivatedRoute
    ) {}


    ngOnInit() {



      forkJoin({
        portfolio: this.sheetService.getSheetData('Portfolio'),
        contact: this.sheetService.getSheetData('Contact'),
        achievements: this.sheetService.getSheetData('Projects-type'),

      }).subscribe(({portfolio,contact,achievements}) => {
        this.PortfolioData = portfolio.values;
        this.ContactData = contact.values;
        this.achievementsData = achievements.values;
        this.allSectionsLoaded = true;
      });
    }
}
