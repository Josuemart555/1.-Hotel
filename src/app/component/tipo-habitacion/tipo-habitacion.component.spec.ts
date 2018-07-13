import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHabitacionComponent } from './tipo-habitacion.component';

describe('TipoHabitacionComponent', () => {
  let component: TipoHabitacionComponent;
  let fixture: ComponentFixture<TipoHabitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoHabitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
