import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from './list';
import { HeroService } from '../../../core/services/hero.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({selector: 'app-hero-card', template: ''})
class MockHeroCard {}
@Component({selector: 'app-search-box', template: ''})
class MockSearchBox {}
@Component({selector: 'app-confirm-dialog', template: ''})
class MockConfirmDialog {}
@Component({selector: 'app-pagination', template: ''})
class MockPagination {}

describe('List Component', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const heroesMock: Hero[] = [
    { id: '1', name: 'Superman', power: 'strength', imageUrl: '' },
    { id: '2', name: 'Batman', power: 'intelligence', imageUrl: '' },
  ];

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['delete'], {
      heroes: of(heroesMock),
    });

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [List, MockHeroCard, MockSearchBox, MockConfirmDialog, MockPagination, NgOptimizedImage],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit page on edit', () => {
    component.onEdit('123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list', '123', 'edit']);
  });

  it('should update search term and reset page on search', () => {
    component.onSearch('batman');
    expect(component.searchTerm()).toBe('batman');
    expect(component.currentPage()).toBe(1);
  });

  it('should go to next page if not at last page', () => {
    component.currentPage.set(1);
    spyOnProperty(component, 'totalPages', 'get').and.returnValue(2);
    component.nextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should not go to next page if at last page', () => {
    component.currentPage.set(2);
    spyOnProperty(component, 'totalPages', 'get').and.returnValue(2);
    component.nextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should go to previous page if not on first page', () => {
    component.currentPage.set(2);
    component.prevPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should not go to previous page if on first page', () => {
    component.currentPage.set(1);
    component.prevPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should confirm deletion and delete hero', () => {
    const hero: Hero = { id: '2', name: 'Batman', power: 'intelligence', imageUrl: '' };
    component.confirmRemove(hero);
    component.onDialogResponse(true);
    expect(mockHeroService.delete).toHaveBeenCalledWith('2');
    expect(component.showConfirmDialog()).toBeFalse();
    expect(component.heroToDelete()).toBeNull();
  });

  it('should cancel deletion and reset state', () => {
    const hero: Hero = { id: '1', name: 'Superman', power: 'strength', imageUrl: '' };
    component.confirmRemove(hero);
    component.onDialogResponse(false);
    expect(mockHeroService.delete).not.toHaveBeenCalled();
    expect(component.showConfirmDialog()).toBeFalse();
    expect(component.heroToDelete()).toBeNull();
  });
});
