import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoDiario } from './reto-diario';

describe('RetoDiario', () => {
  let component: RetoDiario;
  let fixture: ComponentFixture<RetoDiario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetoDiario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetoDiario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
