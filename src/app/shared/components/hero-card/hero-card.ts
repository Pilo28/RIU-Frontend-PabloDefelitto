import { Component, input, output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hero-card',
  imports: [],
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

}
