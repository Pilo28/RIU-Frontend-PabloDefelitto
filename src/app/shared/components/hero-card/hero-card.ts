import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hero-card',
  imports: [],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss'
})
export class HeroCard {

  @Input({ required: true }) hero!: Hero;
  @Input() defaultImage: string = environment.previewImageUrl;

  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  useDefaultImage = false;

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImage;
    this.useDefaultImage = true;
  }

}
