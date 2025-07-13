import { Component, computed, input, output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { environment } from '../../../../environments/environment';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-card',
  imports: [NgOptimizedImage],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss'
})
export class HeroCard {

  hero = input.required<Hero>();
  defaultImage = input(environment.previewImageUrl);

  edit = output<string>();
  remove = output<string>();

  useDefaultImage = false;

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImage();
    this.useDefaultImage = true;
  }

  readonly heroImage = computed(() => {
  const url = this.hero().imageUrl?.trim();
  return url ? url : this.defaultImage();
});


}
