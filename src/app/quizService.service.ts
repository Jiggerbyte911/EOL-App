import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizData, Quizfrage } from './quizfrage.interface';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Quizservice {
  private http = inject(HttpClient);
  private quizDataCache: Map<string, QuizData> = new Map();
  private quizDataUrl = 'assets/quiz/quizfragen.json';

  /**
   * Lädt die Quiz-Daten für einen bestimmten Ozean
   * @param oceanId - Die ID des Ozeans (z.B. 'pazifik', 'atlantik')
   * @returns Observable mit den Quiz-Daten
   */
  getQuizData(oceanId: string): Observable<QuizData | null> {
    console.log('Service: getQuizData called with oceanId:', oceanId);

    // Prüfe ob Daten bereits im Cache sind
    if (this.quizDataCache.has(oceanId)) {
      console.log('Service: Data found in cache for:', oceanId);
      return of(this.quizDataCache.get(oceanId) || null);
    }

    console.log('Service: Loading data from:', this.quizDataUrl);

    // Lade alle Quiz-Daten aus der JSON
    return this.http.get<{ [key: string]: QuizData }>(this.quizDataUrl).pipe(
      map((allData) => {
        console.log('Service: Data loaded from JSON:', Object.keys(allData));
        const quizData = allData[oceanId] || null;
        console.log('Service: Quiz data for', oceanId, ':', quizData);
        if (quizData) {
          this.cacheQuizData(oceanId, quizData);
        }
        return quizData;
      }),
      catchError((error) => {
        console.error('Service: Error loading quiz data:', error);
        return of(null);
      })
    );
  }

  /**
   * Lädt alle Quiz-Daten und cached sie
   * @returns Observable mit allen Quiz-Daten
   */
  loadAllQuizData(): Observable<{ [key: string]: QuizData }> {
    return this.http.get<{ [key: string]: QuizData }>(this.quizDataUrl).pipe(
      map((allData) => {
        // Cache alle Daten
        Object.keys(allData).forEach((oceanId) => {
          this.cacheQuizData(oceanId, allData[oceanId]);
        });
        return allData;
      }),
      catchError((error) => {
        console.error('Fehler beim Laden aller Quiz-Daten:', error);
        return of({});
      })
    );
  }

  /**
   * Gibt die Quiz-Daten für einen Ozean zurück (synchron aus Cache)
   * Verwende diese Methode nur, wenn die Daten bereits geladen wurden
   * @param oceanId - Die ID des Ozeans
   * @returns Die Quiz-Daten oder null
   */
  getQuizDataSync(oceanId: string): QuizData | null {
    return this.quizDataCache.get(oceanId) || null;
  }

  /**
   * Cache die Quiz-Daten
   * @param oceanId - Die ID des Ozeans
   * @param data - Die Quiz-Daten
   */
  cacheQuizData(oceanId: string, data: QuizData): void {
    this.quizDataCache.set(oceanId, data);
  }
}
