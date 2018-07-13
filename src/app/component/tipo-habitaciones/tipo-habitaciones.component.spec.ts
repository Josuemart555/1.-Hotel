import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHabitacionesComponent } from './tipo-habitaciones.component';

describe('TipoHabitacionesComponent', () => {
  let component: TipoHabitacionesComponent;
  let fixture: ComponentFixture<TipoHabitacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoHabitacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
