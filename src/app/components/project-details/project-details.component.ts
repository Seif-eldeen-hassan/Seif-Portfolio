import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SheetService } from '../../shared/sheet.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GetInTouchComponent } from '../../shared/get-in-touch/get-in-touch.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf,LoaderComponent,GetInTouchComponent,NgFor,NgStyle,RouterModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})

export class ProjectDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  PortfolioData: any[] = [];
  ContactData: any[] = [];
  achievementsData: any[] = [];
  allSectionsLoaded = false;

  ProjectName! : string;
  ProjectType! : string;
  ProjectTitleDesc! : string;
  ProjectVideoLink!: SafeResourceUrl;
  ProjectImage! : string;
  ProjectDesc! : string;
  Projectcategory! : string | null;
  TechUsedData: string[] = [];
  KeyFeautersData: string[] = [];
  IsVideo! : boolean;
  IsPrivateCode! : boolean;
  IsLiveDemo! : boolean;
  ProjectGithubCode! : SafeResourceUrl;
  ProjectLiveDemo! : SafeResourceUrl;

  ngOnInit() {
    forkJoin({
        portfolio: this.sheetService.getSheetData('Portfolio'),
        contact: this.sheetService.getSheetData('Contact'),
      }).subscribe(({portfolio,contact}) => {
        this.PortfolioData = portfolio.values;
        this.ContactData = contact.values;
        const projectid = Number(this.route.snapshot.paramMap.get('id'));
        const project_category = this.route.snapshot.paramMap.get('project-category');
        this.Projectcategory = project_category
        this.IsVideo = this.CheckBoolean(this.PortfolioData[projectid][5])
        this.IsPrivateCode = this.CheckBoolean(this.PortfolioData[projectid][11])
        this.IsLiveDemo = this.CheckBoolean(this.PortfolioData[projectid][12])

        if(!this.IsPrivateCode){
          const GithubUrl = this.PortfolioData[projectid][14];
          this.ProjectGithubCode = this.sanitizer.bypassSecurityTrustResourceUrl(GithubUrl)
        }

        if(this.IsLiveDemo){
          const DemoUrl = this.PortfolioData[projectid][13];
          this.ProjectLiveDemo = this.sanitizer.bypassSecurityTrustResourceUrl(DemoUrl);
        }

        if(this.IsVideo) {
          const videoUrl = this.PortfolioData[projectid][7];
          this.ProjectVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        }
        else{
          this.ProjectImage = this.PortfolioData[projectid][6]
        }


        this.ProjectName = this.PortfolioData[projectid][2]
        this.ProjectType = this.PortfolioData[projectid][4]
        this.ProjectTitleDesc = this.PortfolioData[projectid][3]
        this.ProjectDesc = this.PortfolioData[projectid][8];
        this.TechUsedData = this.extractTags(this.PortfolioData[projectid][9]);
        this.KeyFeautersData = this.extractTags(this.PortfolioData[projectid][10]);
        this.allSectionsLoaded = true;

        console.log('GitHub Code Link:', this.ProjectGithubCode);
        console.log('Live Demo Link:', this.ProjectLiveDemo);
        console.log('Video URL:', this.ProjectVideoLink);
        console.log('Project Image URL:', this.ProjectImage);
        console.log('Project Name:', this.ProjectName);
        console.log('Project Type:', this.ProjectType);
        console.log('Project Title Desc:', this.ProjectTitleDesc);
        console.log('Project Description:', this.ProjectDesc);
        console.log('Extracted Tech Used Data:', this.TechUsedData);
        console.log('Extracted Key Features Data:', this.KeyFeautersData);

        this.cdr.detectChanges();


    });

  }

  CheckBoolean(num : string) : boolean{
    return num == "TRUE" ? true : false
  }

  extractTags(str: string): string[] {
    const regex = /{(.*?)}/g;
    const matches: string[] = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  }

}
