import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OCEANS_DATA, Ozean } from '../ozean.interface';

@Component({
  selector: 'app-ozeaninfo',
  imports: [RouterModule],
  templateUrl: './ozeaninfo.html',
  styleUrl: './ozeaninfo.css',
})
export class Ozeaninfo implements OnInit {
  ozean: Ozean | undefined;
  quizRoute: string = '';

  // ActivatedRoute mit inject() erhalten (ab Angular 14)
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Abonnieren der Routenparameter
    this.route.paramMap.subscribe((params) => {
      const oceanId = params.get('oceanId');
      this.ozean = OCEANS_DATA.find((o) => o.id === oceanId);
      // Quiz-Route basierend auf der Ocean-ID generieren
      if (oceanId) {
        this.quizRoute = `/ozeane/${oceanId}/quiz`;
      }
    });
  }
}
