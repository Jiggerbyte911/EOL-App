import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizResultService {
  private quizResultSubject = new BehaviorSubject<string>('');
  quizResult$ = this.quizResultSubject.asObservable();

  setQuizResult(score: number, total: number): void {
    const result = `${score}|${total}`;
    this.quizResultSubject.next(result);
    sessionStorage.setItem('quizScore', result);
  }

  getQuizResult(): string {
    return this.quizResultSubject.value;
  }

  clearQuizResult(): void {
    this.quizResultSubject.next('');
    sessionStorage.removeItem('quizScore');
  }
}
