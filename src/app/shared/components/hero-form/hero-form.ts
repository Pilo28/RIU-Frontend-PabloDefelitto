import { UppercaseDirective } from './../../directives/uppercase';
import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, NgOptimizedImage, UppercaseDirective],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss'
})
export class HeroForm {

  readonly initialHero = input<Hero | null>(null);
  readonly submitForm = output<Omit<Hero, 'id'>>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const hero = this.initialHero();
    this.form = this.fb.group({
      name: [
        hero?.name || '',
        [Validators.required, Validators.maxLength(8)]
      ],
      power: [
        hero?.power || '',
        [Validators.required, Validators.maxLength(9)]
      ],
      imageUrl: [
        hero?.imageUrl || '',
        [this.imageUrlValidator]
      ]
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
  return isValidImage ? url : environment.previewImageUrl;
  }



  imageUrlValidator(control: import("@angular/forms").AbstractControl) {
  const url = control.value;
  if (!url) return null;

  const imageRegex = /\.(jpeg|jpg|png|gif|webp)$/i;
  return imageRegex.test(url) ? null : { invalidImageUrl: true };
}

}
