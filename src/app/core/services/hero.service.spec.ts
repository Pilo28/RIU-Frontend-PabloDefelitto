import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/hero.model';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes', () => {
    const heroes = service.getAll();
    expect(Array.isArray(heroes)).toBeTrue();
    expect(heroes.length).toBeGreaterThan(0);
  });

  it('should create a new hero', () => {
    const initialCount = service.getAll().length;

    service.create({ name: 'TestHero', power: 'TestPower', imageUrl: 'test.jpg' });

    const newHeroes = service.getAll();
    expect(newHeroes.length).toBe(initialCount + 1);
    const newHero = newHeroes[0];
    expect(newHero.name).toBe('TestHero');
  });

  it('should update a hero', () => {
    const hero = service.getAll()[0];
    const updated = { ...hero, name: 'UpdatedName' };

    service.update(updated);

    const result = service.getById(hero.id);
    expect(result?.name).toBe('UpdatedName');
  });

  it('should delete a hero', () => {
    const hero = service.getAll()[0];
    service.delete(hero.id);

    const deleted = service.getById(hero.id);
    expect(deleted).toBeUndefined();
  });

  it('should find hero by id', () => {
    const hero = service.getAll()[0];
    const found = service.getById(hero.id);

    expect(found).toBeTruthy();
    expect(found?.id).toBe(hero.id);
  });

  it('should search heroes by name', () => {
    const result = service.search('man');
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(h => h.name.toLowerCase().includes('man'))).toBeTrue();
  });
});
