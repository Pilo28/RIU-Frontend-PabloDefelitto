import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {
  readonly title = input('Confirm');
  readonly message = input('Are you sure?');

  readonly confirm = output<boolean>();

  onYes() {
    this.confirm.emit(true);
  }

  onNo() {
    this.confirm.emit(false);
  }
}
