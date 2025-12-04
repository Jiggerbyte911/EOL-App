import {
  AfterViewInit,
  Component,
  OnDestroy,
  ChangeDetectorRef,
  inject,
  NgZone,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizResultService } from '../../quizResultService.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sprechblase',
  imports: [CommonModule],
  templateUrl: './sprechblase.html',
  styleUrl: './sprechblase.css',
})
export class Sprechblase implements AfterViewInit, OnDestroy {
  private resizeHandler = () => this.updateCssVars();
  private observer?: MutationObserver;
  private router = inject(Router);
  private quizResultService = inject(QuizResultService);
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  sprechblasenText: string =
    'Na, ihr kleinen Flitzpiepen? Lust auf eine spannende Reise durch die Welt der Erde und Ozeane?';
  quizScore: string = '';

  ngAfterViewInit(): void {
    // Aktualisiere Text basierend auf URL
    this.updateTextByRoute();

    // initial set
    this.updateCssVars();

    // update on window resize
    window.addEventListener('resize', this.resizeHandler);

    // observe text changes inside the sprechblase container
    const el = document.querySelector('.container-sprechblase');
    if (el) {
      this.observer = new MutationObserver(() => this.updateCssVars());
      this.observer.observe(el, { childList: true, subtree: true, characterData: true });
    }

    // Höre auf Route-Änderungen
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('Route changed, updating sprechblase text');
        this.updateTextByRoute();
        setTimeout(() => this.updateCssVars(), 100);
      });

    // Höre auf Quiz-Ergebnis-Änderungen
    this.quizResultService.quizResult$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      console.log('Quiz result changed:', result);
      console.log('Current URL:', this.router.url);
      this.updateTextByRoute();
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
      setTimeout(() => this.updateCssVars(), 100);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    if (this.observer) {
      this.observer.disconnect();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTextByRoute(): void {
    const currentUrl = this.router.url;
    const quizScoreParam = this.quizResultService.getQuizResult();

    // Überprüfe auf verschiedene Routen - QUIZ MUSS ZUERST CHECKED WERDEN!
    if (currentUrl === '' || currentUrl === '/') {
      this.sprechblasenText =
        'Na, Lust auf eine spannende Reise durch die Welt der Erde und Ozeane?<br>Am Ende kannst du dein Wissen sogar mit einem Quiz testen!<br>Wenn du wieder zurück auf diese Seite willst, musst du nur auf das Logo oben in der der Mitte der Seite klicken.<br>Viel Erfolg!';
      this.quizScore = '';
    } else if (currentUrl.includes('/quiz')) {
      // Quiz-Route (kann /ozeane/:id/quiz sein)
      if (quizScoreParam) {
        const [score, total] = quizScoreParam.split('|');
        this.sprechblasenText = `Wow, du hast ${score} von ${total} Punkten erreicht!`;
        this.quizScore = '';
      } else {
        this.sprechblasenText = 'Viel Erfolg beim Quiz! Du schaffst das!';
        this.quizScore = '';
      }
    } else if (currentUrl.includes('/ozeane/')) {
      const oceanMatch = currentUrl.match(/\/ozeane\/([^/]+)/);
      if (oceanMatch) {
        const oceanId = oceanMatch[1];
        const oceanNames: { [key: string]: string } = {
          pazifik: 'Pazifik',
          atlantik: 'Atlantik',
          indischer: 'Indischer Ozean',
          arktis: 'Arktischen Ozean',
          antarktis: 'Antarktis',
        };
        const oceanName = oceanNames[oceanId] || oceanId;
        this.sprechblasenText = `Wow! Der ${oceanName} ist faszinierend, nicht wahr? Jetzt teste dein Wissen!`;
        this.quizScore = '';
      }
    } else {
      this.sprechblasenText =
        'Na, ihr kleinen Flitzpiepen? Lust auf eine spannende Reise durch die Welt der Erde und Ozeane?';
      this.quizScore = '';
    }
  }

  private updateCssVars(): void {
    const el = document.querySelector('.container-sprechblase') as HTMLElement | null;
    if (!el || !document.documentElement) return;

    const rect = el.getBoundingClientRect();
    const height = Math.round(rect.height);
    // distance from bottom of viewport to bottom of element
    const bottom = Math.round(window.innerHeight - rect.bottom);

    document.documentElement.style.setProperty('--sprechblase-height', `${height}px`);
    document.documentElement.style.setProperty('--sprechblase-bottom', `${bottom}px`);
  }
}
