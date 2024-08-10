import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  lang: string = '';
  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
  ];
  constructor(private translate: TranslateService) {}
  ngOnInit() {
    this.lang =
      typeof window !== 'undefined'
        ? localStorage.getItem('lang') || 'en'
        : 'en';
    this.translate.use(this.lang);
  }
  ChangeLang(event: MatSelectChange) {
    if (typeof window !== 'undefined') {
      const selectedLanguage = event.value;
      localStorage.setItem('lang', selectedLanguage);
      this.translate.use(selectedLanguage);
    }
  }
}
