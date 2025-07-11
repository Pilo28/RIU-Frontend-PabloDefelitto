import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/components/header/header';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,Header],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
