import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCreate } from './study-create';

describe('StudyCreate', () => {
  let component: StudyCreate;
  let fixture: ComponentFixture<StudyCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
