import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterMedicoComponent } from './router-medico.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY,  Subject } from 'rxjs';

class FakeRouter{
  navigate(params:any){
  }
}

class FakeActivatedRoute{
    //public params:Observable<any> = EMPTY;
    
    private subject = new Subject();
    push(valor:any){
      this.subject.next(valor);
    }

    get params(){
      return this.subject.asObservable()
    }
}

describe('RouterMedicoComponent',
   () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers:[
        {provide:  Router, useClass: FakeRouter},
        {provide:  ActivatedRoute, useClass: FakeActivatedRoute}
      ]
    });
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de rediccionar a medico cuando0 se guardel ', ()=>{
    const router = TestBed.get(Router);
    const _spyOn =  spyOn(router, 'navigate');

    component.guardarMedico();
    expect(_spyOn).toHaveBeenCalledWith(['medico','123']);    
  });

  it('Debe de colocar el id  = nuevo', ()=>{
    component = fixture.componentInstance;
    const _activatedRoute: FakeActivatedRoute =  TestBed.get(ActivatedRoute);
    _activatedRoute.push({id: 'nuevo'});
    expect(component.id).toBe('nuevo');
  });
});