import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule ,RouterLink, RouterOutlet } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    RouterLink, RouterOutlet
  ],
  imports: [
    CommonModule,
    RouterModule,      
  ]
})
export class SharedModule { }