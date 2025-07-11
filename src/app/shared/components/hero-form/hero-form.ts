import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss'
})
export class HeroForm {
  @Input() initialHero: Hero | null = null;
  @Output() submitForm = new EventEmitter<Omit<Hero, 'id'>>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.initialHero?.name || '', Validators.required],
      power: [this.initialHero?.power || '', Validators.required],
      imageUrl: [this.initialHero?.imageUrl || '', [this.imageUrlValidator]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  get previewImage(): string | null {
  const url = this.form?.get('imageUrl')?.value;
  const isValidImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  return isValidImage ? url : 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExemNuajQ5YTVidTVnMWN2YzU3a214ODZ0MHA4Z3YycWNyYzIxbG8xYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/76xOJtHpn1b5rCWqew/giphy.gif';
  }



  imageUrlValidator(control: import("@angular/forms").AbstractControl) {
  const url = control.value;
  if (!url) return null;

  const imageRegex = /\.(jpeg|jpg|png|gif|webp)$/i;
  return imageRegex.test(url) ? null : { invalidImageUrl: true };
}

}
