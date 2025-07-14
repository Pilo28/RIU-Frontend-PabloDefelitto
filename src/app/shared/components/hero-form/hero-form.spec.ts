import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroForm } from './hero-form';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Hero } from '../../../core/models/hero.model';

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;

  const mockHero: Hero = {
    id: '1',
    name: 'Batman',
    power: 'Detective',
    imageUrl: 'https://fake-url.com/image.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HeroForm]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark name as required', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error'));
    expect(errorMsg.nativeElement.textContent).toContain('Name is required');
  });

  it('should emit hero on valid submit', () => {
    const formSpy = spyOn(component.submitForm, 'emit');

    component.form.setValue({
      name: 'Superman',
      power: 'Flight',
      imageUrl: 'https://example.com/superman.png'
    });

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    expect(formSpy).toHaveBeenCalledWith({
      name: 'Superman',
      power: 'Flight',
      imageUrl: 'https://example.com/superman.png'
    });
  });
});
