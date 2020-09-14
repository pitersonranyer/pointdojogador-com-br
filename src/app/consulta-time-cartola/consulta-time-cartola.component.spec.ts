import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTimeCartolaComponent } from './consulta-time-cartola.component';

describe('ConsultaTimeCartolaComponent', () => {
  let component: ConsultaTimeCartolaComponent;
  let fixture: ComponentFixture<ConsultaTimeCartolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTimeCartolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTimeCartolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
