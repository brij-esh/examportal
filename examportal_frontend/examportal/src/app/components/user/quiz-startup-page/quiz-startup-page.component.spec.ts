import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStartupPageComponent } from './quiz-startup-page.component';

describe('QuizStartupPageComponent', () => {
  let component: QuizStartupPageComponent;
  let fixture: ComponentFixture<QuizStartupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizStartupPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizStartupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
