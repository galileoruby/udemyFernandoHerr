import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../pages/account-settings/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private sideBarService: SidebarService, public router: Router) {
    this.menuItems = sideBarService.menu;
  }
  
  ngOnInit(): void { }
}