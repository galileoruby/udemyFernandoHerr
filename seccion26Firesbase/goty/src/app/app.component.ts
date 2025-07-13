import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  standalone: true,

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ 
    NavbarComponent,    
    RouterOutlet  ],
  
    
   
})
export class AppComponent {
  title = 'goty';
}
