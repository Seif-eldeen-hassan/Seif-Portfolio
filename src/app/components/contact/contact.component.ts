import { NgClass, NgIf } from '@angular/common';
import { Component , ViewChild , ElementRef , ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import emailjs from 'emailjs-com';
import { GetInTouchComponent } from '../../shared/get-in-touch/get-in-touch.component';
import { SheetService } from '../../shared/sheet.service';
import { forkJoin } from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgClass,NgIf,RouterModule,GetInTouchComponent,LoaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {

  @ViewChild('topSection') topSection!: ElementRef;

  constructor(private sheetService: SheetService, private cdRef: ChangeDetectorRef) {}

  MessageSent = false;
  sending = false;
  send_text = "Send Message";
  ContactData: any[] = [];
  allSectionsLoaded = false;

  ngOnInit() {
    forkJoin({
      contact: this.sheetService.getSheetData('Contact'),
    }).subscribe(({ contact }) => {
      this.ContactData = contact.values;
      this.allSectionsLoaded = true;
      setTimeout(() => {
        this.cdRef.detectChanges();
        this.scrollToTop();
      }, 0);
    });
  }


  scrollToTop() {
    if (this.topSection) {
      this.topSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  sendEmail(e: Event) {
    this.sending = true;
    this.send_text = "Sending Message";
    e.preventDefault();
    emailjs.sendForm('service_etfey2u', 'template_o8pgwid', e.target as HTMLFormElement, '_oP9amdmCAcKr3Y2a')
      .then(() => {
        this.MessageSent = true;
      }, () => {
        alert("Message failed to send.");
      });
  }

  GoBackBt() {
    const inputs = document.querySelectorAll(".input");
    for (let i = 0; i < 4; i++) {
      const inputElement = inputs[i] as HTMLInputElement | HTMLTextAreaElement;
      inputElement.value = "";
    }
    this.MessageSent = false;
    this.sending = false;
    this.send_text = "Send Message";
  }
}
