import { ComponentFixture, TestBed } from '@angular/core/testing';
import { New } from './new';
import { HeroService } from '../../../core/services/hero.service';
import { Router } from '@angular/router';
import { HeroForm } from '../../../shared/components/hero-form/hero-form';
import { BackButtonDirective } from '../../../shared/directives/back-button';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('New', () => {
  let component: New;
  let fixture: ComponentFixture<New>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockHero = {
    name: 'Flash',
    power: 'Speed',
    imageUrl: 'https://example.com/image.jpg'
  };

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [New, HeroForm, BackButtonDirective, RouterTestingModule],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(New);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the New component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createHero and navigate on form submit', () => {
    // Simular el evento emitido desde HeroForm
    const heroForm = fixture.debugElement.query(By.directive(HeroForm));
    heroForm.triggerEventHandler('submitForm', mockHero);
    fixture.detectChanges();

    expect(heroServiceSpy.create).toHaveBeenCalledOnceWith(mockHero);
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/list']);
  });
});
