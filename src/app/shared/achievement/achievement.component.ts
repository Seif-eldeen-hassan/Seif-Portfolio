import { Component,Input} from '@angular/core';
import { NgFor} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.css'
})
export class AchievementComponent{

  @Input() ProjectsTypeData!: any[];

  ProjectsTypes: any[] = [];
  ProjectsTypeQuan: any[] = [];
  AchDescription! :string;

  ngOnInit() {
      this.AchDescription = this.ProjectsTypeData[1][2]
      for(let i = 0 ; i < this.ProjectsTypeData.length-1 ; i++ ){
          this.ProjectsTypes[i] = this.ProjectsTypeData[i+1][0];
          this.ProjectsTypeQuan[i] = this.ProjectsTypeData[i+1][1];
      }

  }


}
