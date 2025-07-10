import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';

@Component({
  selector: 'app-hero-card',
  imports: [],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss'
})
export class HeroCard {

  @Input({ required: true }) hero!: Hero;
  @Input() defaultImage: string = 'assets/default-hero.jpg';

  @Output() edit = new EventEmitter<string>();   // emit hero.id
  @Output() remove = new EventEmitter<string>();

}
