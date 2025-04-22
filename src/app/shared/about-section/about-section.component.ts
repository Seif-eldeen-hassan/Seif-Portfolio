import { Component, ViewChild, ElementRef , Input } from '@angular/core';
import { NgFor} from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {
  @ViewChild('projectSection') projectSection!: ElementRef;
  scroll_to_project() {
    this.projectSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

   @Input() AboutData!: any[];

   Profients: any[] = [];
   AboutDescription! :string;

  ngOnInit() {
      this.AboutDescription = this.AboutData[1][0]
      for(let i = 0 ; i < this.AboutData.length-1 ; i++ ){
          this.Profients[i] = this.AboutData[i+1][1];
      }
  }

}
