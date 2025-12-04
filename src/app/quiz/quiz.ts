import { Quizservice } from '../quizService.service';
import { QuizResultService } from '../quizResultService.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizData } from '../quizfrage.interface';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {
  quizData: QuizData | null = null;
  currentQuestion: number = 0;
  selectedAnswer: number | null = null;
  showResult: boolean = false;
  showResults: boolean = false;
  score: number = 0;
  errorMessage: string = '';

  private quizService = inject(Quizservice);
  private route = inject(ActivatedRoute);
  private quizResultService = inject(QuizResultService);

  ngOnInit(): void {
    console.log('Quiz Component ngOnInit');
    // Ocean-ID aus der Route ermitteln
    this.route.paramMap.subscribe((params) => {
      const oceanId = params.get('oceanId');
      console.log('Ocean ID from route:', oceanId);
      if (oceanId) {
        // Quiz-Daten aus JSON laden
        this.loadQuizData(oceanId);
      }
    });
  }

  private loadQuizData(oceanId: string): void {
    console.log('Loading quiz data for:', oceanId);
    // Quiz-Daten aus Service laden
    this.quizService.getQuizData(oceanId).subscribe({
      next: (data) => {
        console.log('Quiz data loaded:', data);
        this.quizData = data;
        if (!data) {
          this.errorMessage = `Quiz-Daten für Ozean "${oceanId}" nicht gefunden`;
          console.error(this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = `Fehler beim Laden der Quiz-Daten: ${err.message}`;
        console.error(this.errorMessage, err);
      },
    });
  }

  selectAnswer(index: number): void {
    this.selectedAnswer = index;
  }

  submitAnswer(): void {
    if (this.selectedAnswer !== null && this.quizData) {
      this.showResult = true;
      // Punkte zählen
      if (this.selectedAnswer === this.quizData.questions[this.currentQuestion].correct) {
        this.score++;
      }
    }
  }

  nextQuestion(): void {
    this.currentQuestion++;
    this.selectedAnswer = null;
    this.showResult = false;
  }

  finishQuiz(): void {
    this.showResults = true;
    // Speichere die Punktzahl über den Service
    const totalQuestions = this.quizData?.questions.length || 0;
    this.quizResultService.setQuizResult(this.score, totalQuestions);
  }
}
