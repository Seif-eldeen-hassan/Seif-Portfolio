import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component , Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { forkJoin } from 'rxjs';
import { SheetService } from '../../shared/sheet.service';

@Component({
  selector: 'app-look-what-i-did',
  standalone: true,
  imports: [NgFor,NgStyle,NgClass,RouterModule,NgIf],
  templateUrl: './look-what-i-did.component.html',
  styleUrl: './look-what-i-did.component.css'
})
export class LookWhatIDidComponent {

   @Input() portfolioData!: any[];
   @Input() AchievementsData!: any[];
   @Input() centeredTitle!: boolean;

   ProjectNames: any[] = [];
   ProjectDesc: any[] = [];
   ProjectThumbnails: any[] = [];
   Portfolio_par! :string;
   CardNumber!: number;
   ProjectsType! :string|null;
   EmptyProjects = false;

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
  ){}



  ngOnInit() {
    this.route.params.subscribe(params => {
      const category = params['project-type']; // Make sure your route is set to accept this param
      const project_type = this.route.snapshot.paramMap.get('project-type');
      this.ProjectNames =[];
      this.ProjectDesc =[];
      this.ProjectThumbnails =[];
      this.Portfolio_par = "";
      this.EmptyProjects = false;
      if(project_type){
        this.ProjectsType = project_type;
        this.CardNumber = this.portfolioData.length;
        console.log(this.AchievementsData)
        for(let i = 1 ; i < 4 ; i++){
          if(this.ProjectsType == this.AchievementsData[i][0]){
            this.Portfolio_par = this.AchievementsData[i][3];
            console.log(this.AchievementsData[i][1])
            if(this.AchievementsData[i][1] == "0 projects"){
              this.EmptyProjects = true
              return

            }
            break;
          }
        }
      }
      else{

        if(this.centeredTitle){
          this.ProjectsType = "My Projects";
          this.Portfolio_par = this.portfolioData[1][0];
          this.CardNumber = 4;
          }
          else{
          this.ProjectsType = "All Projects";
          this.Portfolio_par = this.portfolioData[2][0];
          this.CardNumber = this.portfolioData.length;
          }
      }

      let index = 0;

      for (let i = 0; i < this.CardNumber - 1; i++) {
      const row = this.portfolioData[i + 1];

      if (this.ProjectsType === "All Projects" ||this.ProjectsType === "My Projects" || this.ProjectsType === row[15]) {
        this.ProjectThumbnails[index] = row[1];
        this.ProjectNames[index] = row[2];
        this.ProjectDesc[index] = row[3];
        index++;
      }
    }

    });


  }

}
