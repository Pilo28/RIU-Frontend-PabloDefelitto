import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCard } from './hero-card';
import { Hero } from '../../../core/models/hero.model';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

describe('HeroCard', () => {
  let component: HeroCard;
  let fixture: ComponentFixture<HeroCard>;

  const mockHero: Hero = {
    id: '1',
    name: 'Test Hero',
    power: 'Testing',
    imageUrl: 'https://fake-image-url.com/image.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCard, NgOptimizedImage]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCard);
    component = fixture.componentInstance;

    (component as any).hero.set?.(mockHero);
    Object.defineProperty(component, 'hero', {
      value: () => mockHero
    });

    fixture.detectChanges();
  });

  it('should render hero name and power', () => {
    const name = fixture.nativeElement.querySelector('h3');
    const power = fixture.nativeElement.querySelector('p');

    expect(name?.textContent).toContain(mockHero.name);
    expect(power?.textContent).toContain(mockHero.power);
  });

  it('should emit edit event when edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    const editButton = fixture.debugElement.query(By.css('button[aria-label^="Edit"]'));
    editButton.nativeElement.click();
    expect(component.edit.emit).toHaveBeenCalledWith(mockHero.id);
  });

  it('should emit remove event when delete button is clicked', () => {
    spyOn(component.remove, 'emit');
    const deleteButton = fixture.debugElement.query(By.css('button[aria-label^="Delete"]'));
    deleteButton.nativeElement.click();
    expect(component.remove.emit).toHaveBeenCalledWith(mockHero.id);
  });
});
