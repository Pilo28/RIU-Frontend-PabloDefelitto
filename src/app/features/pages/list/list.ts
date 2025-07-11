import { Component, computed, inject, signal } from '@angular/core';
import { HeroService } from '../../../core/services/hero';
import { Router } from '@angular/router';
import { HeroCard } from '../../../shared/components/hero-card/hero-card';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list',
  imports: [HeroCard],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  private readonly heroService = inject(HeroService);
  readonly router = inject(Router);

  readonly heroes = this.heroService.heroes;
  readonly defaultImage = environment.previewImageUrl;
  searchTerm = signal('');

readonly filteredHeroes = computed(() => {
  const term = this.searchTerm().toLowerCase().trim();
  if (!term) return this.heroes();
  return this.heroes().filter(hero =>
    hero.name.toLowerCase().includes(term)
  );
});

  onEdit(id: string) {
    this.router.navigate(['/list', id, 'edit']);
  }

  onRemove(id: string) {
    this.heroService.delete(id);
  }
}
