import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss'
})
export class SearchBox {

  readonly placeholder = input<string>('Buscar...');
  readonly value = input<string>('');
  readonly search = output<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
