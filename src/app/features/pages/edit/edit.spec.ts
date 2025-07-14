import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Edit } from './edit';
import { HeroForm } from '../../../shared/components/hero-form/hero-form';
import { BackButtonDirective } from '../../../shared/directives/back-button';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../../core/services/hero.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Edit', () => {
  let component: Edit;
  let fixture: ComponentFixture<Edit>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockHero = {
    id: '1',
    name: 'Batman',
    power: 'Money',
    imageUrl: 'https://example.com/batman.jpg'
  };

  const updatedData = {
    name: 'Batman Updated',
    power: 'Technology',
    imageUrl: 'https://example.com/batman-updated.jpg'
  };

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getById', 'update']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Edit, HeroForm, BackButtonDirective, RouterTestingModule],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    heroServiceSpy.getById.and.returnValue(mockHero);

    fixture = TestBed.createComponent(Edit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Edit component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the hero from HeroService by ID', () => {
    expect(heroServiceSpy.getById).toHaveBeenCalledOnceWith('1');
    expect(component.hero).toEqual(mockHero);
  });

  it('should call updateHero and navigate on form submit', () => {
    const form = fixture.debugElement.query(By.directive(HeroForm));
    form.triggerEventHandler('submitForm', updatedData);
    fixture.detectChanges();

    expect(heroServiceSpy.update).toHaveBeenCalledOnceWith({
      ...updatedData,
      id: mockHero.id
    });
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/list']);
  });
});
