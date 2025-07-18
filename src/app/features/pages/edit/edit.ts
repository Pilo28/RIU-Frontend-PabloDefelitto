import { Component, inject } from '@angular/core';
import { HeroForm } from '../../../shared/components/hero-form/hero-form';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../../core/services/hero.service';
import { Hero } from '../../../core/models/hero.model';
import { BackButtonDirective } from '../../../shared/directives/back-button';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [HeroForm, BackButtonDirective, TitleCasePipe],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {

  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  private router = inject(Router);

  hero: Hero | null = null;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.hero = id ? this.heroService.getById(id) ?? null : null;
  }

  updateHero(data: Omit<Hero, 'id'>) {
    if (!this.hero) return;
    this.heroService.update({ ...data, id: this.hero.id });
    this.router.navigate(['/list']);
  }
}
