import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRecord, FormControl, Validators } from '@angular/forms';
import { UserForm } from './user-form';

describe('UserForm', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and validate social networks using FormRecord', () => {
    const redes = component.userForm.controls.redesSociais;

    redes.addControl('instagram', new FormControl('user_insta', Validators.required));
    redes.addControl('twitter', new FormControl('', Validators.required));

    expect(redes.contains('instagram')).toBe(true);
    expect(redes.contains('twitter')).toBe(true);

    expect(redes.get('instagram')?.valid).toBe(true);
    expect(redes.get('twitter')?.valid).toBe(false);

    redes.get('twitter')?.setValue('user_twitter');

    expect(redes.get('twitter')?.valid).toBe(true);
    expect(redes.valid).toBe(true);
  });
  
});
