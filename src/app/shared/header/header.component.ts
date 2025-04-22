import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SheetService } from '../../shared/sheet.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,NgClass,NgIf,NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarVisible = false;
  ProjectsVisible = false;
  alldataLoaded = false;
  AchievementsData: any[] = [];
  ProjectsCategory: any[] = [];

  constructor(private sheetService: SheetService) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleProjectsTab() {
    this.ProjectsVisible = !this.ProjectsVisible;
  }

   ngOnInit() {
      forkJoin({
        achievements: this.sheetService.getSheetData('Projects-type'),

      }).subscribe(({achievements}) => {
        this.AchievementsData = achievements.values;
        for(let i = 0 ; i < 3 ; i++){
          this.ProjectsCategory[i] = this.AchievementsData[i+1][0];
        }

        this.alldataLoaded = true;
      });

    }

}
