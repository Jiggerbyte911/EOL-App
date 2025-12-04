import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Startseite } from './startseite/startseite';
import { Headerleiste } from './headerleiste/headerleiste';
import { Maskottchen } from './maskottchen/maskottchen';

@Component({
  selector: 'app-root',
  imports: [Headerleiste, Maskottchen, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('EOL-EarthOceansLearningApp');
}
