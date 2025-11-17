import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dinobot } from './dinobot';

describe('Dinobot', () => {
  let component: Dinobot;
  let fixture: ComponentFixture<Dinobot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dinobot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dinobot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
