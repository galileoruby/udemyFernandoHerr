import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarraHorizontalComponent } from './grafico-barra-horizontal.component';

describe('GraficoBarraHorizontalComponent', () => {
  let component: GraficoBarraHorizontalComponent;
  let fixture: ComponentFixture<GraficoBarraHorizontalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoBarraHorizontalComponent]
    });
    fixture = TestBed.createComponent(GraficoBarraHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
