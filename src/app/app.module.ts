import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { ToastrModule } from 'ngx-toastr';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './AppConfigService.service';
export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,BrowserAnimationsModule, AppRoutingModule,HttpClientModule,ToastrModule.forRoot()],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
