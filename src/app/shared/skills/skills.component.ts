import { NgFor, NgStyle } from '@angular/common';
import { Component, ViewChild, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgStyle,NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})

export class SkillsComponent {
 @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;
  @Input() SkillsData!: any[];

  targetWidthArr : number[] = [] ;
  SkillsNames :string[] = [];
  SkillsDescription! : string;
  animatedWidthArr = [0, 0, 0];

  ngOnInit() {

    for(let i = 0 ; i < this.SkillsData.length-1 ; i++){
      this.targetWidthArr[i] = Number(this.SkillsData[i+1][2]);
      this.SkillsNames[i] = this.SkillsData[i+1][1];
    }
    this.SkillsDescription = this.SkillsData[1][0]

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          for (let i = 0; i < this.targetWidthArr.length; i++) {
            this.animatedWidthArr[i] = this.targetWidthArr[i];
          }
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(this.skillsSection.nativeElement);
  }
}
