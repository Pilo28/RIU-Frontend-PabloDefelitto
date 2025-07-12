import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure?';

  @Output() confirm = new EventEmitter<boolean>();

  onYes() {
    this.confirm.emit(true);
  }

  onNo() {
    this.confirm.emit(false);
  }
}
