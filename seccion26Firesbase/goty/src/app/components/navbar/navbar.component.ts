import { Component } from '@angular/core';
import {  NgbNav} from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports:[
    NgbNav,
    RouterLink,
    RouterLinkActive

  ]
})
export class NavbarComponent {

    active = 'tab1'; // Initialize with the default active tab ID
}