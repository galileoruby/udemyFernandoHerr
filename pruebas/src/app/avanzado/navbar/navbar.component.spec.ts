import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports:[
        RouterTestingModule.withRoutes([])
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Evaluar routerlink Existe y que redirija', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
      let existe :boolean = false;

      for(const cElem of debugElements){
        if (cElem.attributes['routerLink'] === '/medicos'){
          existe = true;
          break;
        }
      }
      expect(existe).toBe(true)
  });
});