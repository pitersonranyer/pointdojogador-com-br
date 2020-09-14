import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTimesCartolaComponent } from './listar-times-cartola.component';

describe('ListarTimesCartolaComponent', () => {
  let component: ListarTimesCartolaComponent;
  let fixture: ComponentFixture<ListarTimesCartolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTimesCartolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTimesCartolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
