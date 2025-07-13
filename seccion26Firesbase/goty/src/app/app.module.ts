import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';
import { ComponentsModule } from './components/components.module';
import { NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';


import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),  // Required for ng-bootstrap components
    importProvidersFrom(NgbNavModule)
  ]
});
 

@NgModule({
  declarations: [
    // AppComponent,
    // InicioComponent,
    // GotyComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    NgbModule
  
    // NgbModule,
    // NgbNavModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
