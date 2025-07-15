import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { HeroService } from '../../../core/services/hero.service';
import { Router } from '@angular/router';
import { HeroCard } from '../../../shared/components/hero-card/hero-card';
import { environment } from '../../../../environments/environment';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { Hero } from '../../../core/models/hero.model';
import { SearchBox } from '../../../shared/components/search-box/search-box';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TitleCasePipe } from '@angular/common';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-list',
  imports: [HeroCard, ConfirmDialog, SearchBox, Pagination, TitleCasePipe, LoadingSpinner],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit{

  private readonly heroService = inject(HeroService);
  readonly router = inject(Router);

  readonly heroes = this.heroService.heroes;
  readonly defaultImage = environment.previewImageUrl;
  searchTerm = signal('');
  currentPage = signal(1);
  pageSize = signal(6);
  showConfirmDialog = signal(false);
  heroToDelete = signal<Hero | null>(null);
  readonly isReady = signal(false);

  @ViewChild('pageSizeSelect') pageSizeSelect!: ElementRef<HTMLSelectElement>;

  ngOnInit() {
    setTimeout(() => {
      this.isReady.set(true);
    }, 1500);
  }

  readonly filteredHeroes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.heroes();
    return this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(term)
    );
  });

  readonly paginatedHeroes = computed(() => {
    const pageSize = this.pageSize();
    const start = (this.currentPage() - 1) * pageSize;
    const end = start + pageSize;

    return this.filteredHeroes().slice(start, end);
  });

  readonly pageSizeOptions = computed(() => {
  const total = this.filteredHeroes().length;
  const options = Array.from({ length: total }, (_, i) => i + 1);

  const current = this.pageSize();
  if (!options.includes(current)) {
    options.push(current);
    options.sort((a, b) => a - b);
  }

  return options;
});


  get totalPages() {
    return Math.ceil(this.filteredHeroes().length / this.pageSize());
  }

  onPageSizeChange(event: Event) {
  const newSize = +(event.target as HTMLSelectElement).value;
  this.pageSize.set(newSize);
  this.currentPage.set(1);
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.pageSizeSelect?.nativeElement) {
        this.pageSizeSelect.nativeElement.value = String(this.pageSize());
      }
    });
  }
}
