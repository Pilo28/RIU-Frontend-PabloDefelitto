import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../models/hero.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // Estado interno de héroes
  private _heroes = signal<Hero[]>([
    {
      id: uuid(),
      name: 'superman',
      power: 'Strength',
      imageUrl: 'https://img3.wallspic.com/previews/0/4/2/5/6/165240/165240-superman-darkseid-superheroe-dc_comics-la_liga_de_la_justicia-x750.jpg',
    },
    {
      id: uuid(),
      name: 'batman',
      power: 'Intelligence',
      imageUrl: 'https://img2.wallspic.com/previews/9/7/0/7/6/167079/167079-batman-catwoman-arte-dc_comics-superheroe-x750.jpg',
    },
    {
      id: uuid(),
      name: 'spiderman',
      power: 'Speed',
      imageUrl: 'https://img3.wallspic.com/crops/7/4/8/6/4/146847/146847-hombre_arana_rojo_y_negro-3840x2160.jpg', // sin imagen → mostrará default
    }
  ]);

  // Acceso solo lectura
  readonly heroes = computed(() => this._heroes());

  getAll(): Hero[] {
    return this._heroes();
  }

  getById(id: string): Hero | undefined {
    return this._heroes().find(h => h.id === id);
  }

  create(hero: Omit<Hero, 'id'>) {
    const newHero: Hero = { ...hero, id: uuid() };
    this._heroes.update(hs => [...hs, newHero]);
  }

  update(hero: Hero) {
    this._heroes.update(hs => hs.map(h => h.id === hero.id ? hero : h));
  }

  delete(id: string) {
    this._heroes.update(hs => hs.filter(h => h.id !== id));
  }

  search(term: string): Hero[] {
    const t = term.toLowerCase();
    return this._heroes().filter(h => h.name.toLowerCase().includes(t));
  }
}
