import { Component } from '@angular/core';
import { Sprechblase } from './sprechblase/sprechblase';

@Component({
  selector: 'app-maskottchen',
  imports: [Sprechblase],
  templateUrl: './maskottchen.html',
  styleUrl: './maskottchen.css',
})
export class Maskottchen {}
