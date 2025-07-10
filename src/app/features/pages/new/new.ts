import { Component, inject } from '@angular/core';
import { HeroService } from '../../../core/services/hero';
import { Router } from '@angular/router';
import { Hero } from '../../../core/models/hero.model';
import { HeroForm } from '../../../shared/components/hero-form/hero-form';

@Component({
  selector: 'app-new',
  imports: [HeroForm],
  templateUrl: './new.html',
  styleUrl: './new.scss'
})
export class New {
  private heroService = inject(HeroService);
  private router = inject(Router);

  createHero(heroData: Omit<Hero, 'id'>) {
    this.heroService.create(heroData);
    this.router.navigate(['/list']);
  }
}
