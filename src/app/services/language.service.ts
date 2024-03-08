// language.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang: string = 'fr';
  private translations: any = {};
  // language
  welcome_message: string = '';
  welcome_message_sub_title: string = '';

  constructor(private http: HttpClient) {
    this.setLanguage('fr'); // Set default language
    this.updateTranslations();
  }

  public setLanguage(lang: string): void {
    this.currentLang = lang;
    this.loadTranslations();
  }

  public getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  private loadTranslations(): void {
    this.http.get(`assets/i18n/${this.currentLang}.json`).subscribe(
      (translations: any) => {
        this.translations = translations;

        this.updateTranslations();
      },
      (error) => {
        console.error(
          `Failed to load translations for ${this.currentLang}.`,
          error
        );
      }
    );
  }

  // language
  changeLanguage(lang: string): void {
    this.setLanguage(lang);
    // this.updateTranslations();
  }

  private updateTranslations(): void {
    this.welcome_message = this.getTranslation('welcome_message');
    this.welcome_message_sub_title = this.getTranslation(
      'welcome_message_sub_title'
    );
  }
  // language
}
