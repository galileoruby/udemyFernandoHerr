import { Component, OnInit } from '@angular/core';
import { SettingsService } from './account-settings/services/settings.service';


declare function customInitFunction():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    customInitFunction();
   }
}