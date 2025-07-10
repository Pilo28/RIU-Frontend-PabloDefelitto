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
      imageUrl: [this.initialHero?.imageUrl || '']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  get previewImage(): string {
    return this.form?.get('imageUrl')?.value || 'assets/default-hero.jpg';
  }
}
