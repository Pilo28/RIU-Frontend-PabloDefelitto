import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  readonly currentPage = input<number>();
  readonly totalPages = input<number>();

  readonly prev = output<void>();
  readonly next = output<void>();
}
