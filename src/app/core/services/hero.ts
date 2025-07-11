import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../models/hero.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private _heroes = signal<Hero[]>([
  { id: uuid(), name: 'superman', power: 'strength', imageUrl: 'https://img3.wallspic.com/previews/0/4/2/5/6/165240/165240-superman-darkseid-superheroe-dc_comics-la_liga_de_la_justicia-x750.jpg' },
  { id: uuid(), name: 'batman', power: 'intelligence', imageUrl: 'https://img2.wallspic.com/previews/7/3/1/9/59137/59137-personaje_de_ficcion-superheroe-ilustracion-figura_de_accion-demonio-x750.jpg' },
  { id: uuid(), name: 'spiderman', power: 'speed', imageUrl: 'https://img1.wallspic.com/previews/1/5/3/5/2/125351/125351-superheroe-ilustracion-spider_man-la_ficcion-personaje_de_ficcion-x750.jpg' },
  { id: uuid(), name: 'hulk', power: 'combat', imageUrl: 'https://img1.wallspic.com/crops/9/0/6/0/4/140609/140609-animacion-personaje_de_ficcion-superheroe-3840x2160.jpg' },
  { id: uuid(), name: 'iron ma', power: 'technology', imageUrl: 'https://img3.wallspic.com/crops/9/6/8/1/5/151869/151869-iron_man-vengadores_marvel-vengadores_maravillas-maravillas_avengers_beta-spider_man-3840x2160.jpg' },
  { id: uuid(), name: 'wolverine', power: 'claws', imageUrl: 'https://img3.wallspic.com/previews/1/6/6/8/5/158661/158661-comics_de_wolverine_enojado-wolverine-superheroe-marvel_comics-superhroe_de_los_cmics-x750.jpg' },
  { id: uuid(), name: 'aquaman', power: 'water', imageUrl: 'https://img1.wallspic.com/previews/7/5/9/6/3/136957/136957-revisin-x750.jpg' },
  { id: uuid(), name: 'shazam', power: 'magic', imageUrl: 'https://img3.wallspic.com/previews/6/3/8/3/6/163836/163836-dwayne_johnson-adan_negro-shazam-superman-deathstroke-x750.jpg' },
  { id: uuid(), name: 'goku', power: 'super', imageUrl: 'https://img2.wallspic.com/previews/7/6/8/1/7/171867/171867-anime-goku-super_saiyajin-saiyajin-zamasu-x750.jpg' },
  { id: uuid(), name: 'robotech', power: 'fligth', imageUrl: 'https://img3.wallspic.com/previews/8/1/4/4/24418/24418-avion_jet-la_fuerza_aerea-aviacion-aeronave-ingenieria_aeroespacial-x750.jpg' },
  { id: uuid(), name: 'minion', power: 'sympathy', imageUrl: 'https://img2.wallspic.com/previews/4/4/8/7/3/137844/137844-stuart_el_minion-x750.jpg' },
  { id: uuid(), name: 'green man', power: 'spellcasting', imageUrl: 'https://img2.wallspic.com/previews/5/6/1/9/4/149165/149165-personaje_de_ficcion-espacio-supervillano-episodio-temporada-x750.jpg' },
]);



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
