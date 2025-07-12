import { Component, computed, inject, signal } from '@angular/core';
import { HeroService } from '../../../core/services/hero';
import { Router } from '@angular/router';
import { HeroCard } from '../../../shared/components/hero-card/hero-card';
import { environment } from '../../../../environments/environment';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { Hero } from '../../../core/models/hero.model';
import { SearchBox } from '../../../shared/components/search-box/search-box';

@Component({
  selector: 'app-list',
  imports: [HeroCard, ConfirmDialog, SearchBox],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  private readonly heroService = inject(HeroService);
  readonly router = inject(Router);

  readonly heroes = this.heroService.heroes;
  readonly defaultImage = environment.previewImageUrl;
  searchTerm = signal('');
  currentPage = signal(1);
  readonly pageSize = 6;
  showConfirmDialog = signal(false);
  heroToDelete = signal<Hero | null>(null);

  readonly filteredHeroes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.heroes();
    return this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(term)
    );
  });

  readonly paginatedHeroes = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredHeroes().slice(start, end);
  });

  get totalPages() {
    return Math.ceil(this.filteredHeroes().length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  onEdit(id: string) {
    this.router.navigate(['/list', id, 'edit']);
  }

  confirmRemove(hero: Hero) {
  this.heroToDelete.set(hero);
  this.showConfirmDialog.set(true);
  }

  onDialogResponse(confirmed: boolean) {
  if (confirmed && this.heroToDelete()) {
    this.heroService.delete(this.heroToDelete()!.id);
  }
  this.showConfirmDialog.set(false);
  this.heroToDelete.set(null);
  }

  onSearch(term: string) {
  this.searchTerm.set(term);
  this.currentPage.set(1);
  }

}
