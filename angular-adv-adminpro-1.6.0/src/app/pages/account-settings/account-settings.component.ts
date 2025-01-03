import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingService: SettingsService) { }

  //todo::los elementos del componente ahora estan disponibles
  // que el .selector no esta disponible en el constructor en onInit ya esta visible/disponible/creado
  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string): void {
    this.settingService.changeTheme(theme);
  }

}