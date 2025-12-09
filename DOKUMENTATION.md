# Earth Oceans Learning App - Technische Dokumentation

## 1. Projektübersicht

### 1.1 Projektname

**Earth Oceans Learning App (EOL-App)**

### 1.2 Projektbeschreibung

Eine interaktive Lernapplikation für Kinder, die Wissen über die fünf Ozeane der Erde vermittelt. Die App bietet:

- Detaillierte Informationen zu jedem Ozean mit Bildern und Beschreibungen
- Interaktive Quiz-Spiele zum Testen des Wissens
- Kinderfreundliche Benutzeroberfläche mit responsivem Design
- Motivierendes Maskottchen mit dynamischen Nachrichten basierend auf Benutzeraktivitäten

### 1.3 Zielgruppe

Kinder im Grundschulalter (ca. 6-12 Jahre)

### 1.4 Technologie-Stack

- **Framework**: Angular 20 (Standalone Components)
- **Sprache**: TypeScript
- **Styling**: Bootstrap 5.3.8 + Custom CSS
- **HTTP Client**: Angular HttpClient
- **State Management**: RxJS (BehaviorSubject)
- **Build Tool**: Angular CLI

---

## 2. Systemarchitektur

### 2.1 Architektur-Überblick

```
┌─────────────────────────────────────────────────────┐
│              Angular 20 Application                 │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │         Router (app.routes.ts)              │    │
│  │  / → Startseite                             │    │
│  │  /ozeane/:oceanId → Ozeaninfo               │    │
│  │  /ozeane/:oceanId/quiz → Quiz               │    │
│  └─────────────────────────────────────────────┘    │
│                       │                             │
│  ┌────────┬──────────┴──────────┬──────────────┐    │
│  │        │          │          │              │    │
│  ▼        ▼          │          ▼              ▼    │
│ Header  Startseite   │      Ozeaninfo       Quiz    │
│                      │                              │
│                      └──► Maskottchen/Sprechblase   │
│                                                     │
│  Services:                                          │
│  • QuizService (HTTP Daten laden)                   │
│  • QuizResultService (Quiz-Ergebnisse teilen)       │
│                                                     │
│  Data:                                              │
│  • OCEANS_DATA (Statische Ozean-Daten)              │
│  • quizfragen.json (Quiz-Fragen)                    │
└─────────────────────────────────────────────────────┘
```

[TODO: Detailliertes Systemdiagramm aus Projektplanung einfügen]

### 2.2 Routing-Struktur

| Route                   | Komponente | Beschreibung                                   |
| ----------------------- | ---------- | ---------------------------------------------- |
| `/`                     | Startseite | Willkommenseite mit Überblick                  |
| `/ozeane/:oceanId`      | Ozeaninfo  | Detailseite mit Ozeaninformationen und Bildern |
| `/ozeane/:oceanId/quiz` | Quiz       | Quiz-Interface für den jeweiligen Ozean        |

### 2.3 Komponentenhierarchie

```
AppComponent (root)
├── HeaderLeiste (globale Navigation)
├── Router Outlet (wechselnde Views)
│   ├── Startseite
│   ├── Ozeaninfo
│   │   └── Quiz (bei Quiz-Button)
│   └── Quiz
└── Maskottchen (globales Element)
    └── Sprechblase (dynamischer Text)
```

---

## 3. Datenmodelle & Interfaces

### 3.1 Ozean Interface

```typescript
export interface Ozean {
  id: string; // eindeutige ID (z.B. 'pazifik')
  name: string; // Anzeigename (z.B. 'Pazifischer Ozean')
  description: string; // Ausführliche Beschreibung
  picturesLinkList: string[]; // Array von Bildpfaden
  nebenmeera: string[]; // Array von Nebenmeer-Namen
}
```

**Instanzen**: 5 Ozeane in `OCEANS_DATA`

- Pazifik (pazifik)
- Atlantik (atlantik)
- Indischer Ozean (indischer)
- Arktis (arktis)
- Antarktis (antarktis)

### 3.2 Quiz Interfaces

```typescript
export interface QuizQuestion {
  question: string; // Frage
  options: string[]; // 4 Antwortoptionen
  correct: number; // Index der korrekten Antwort
  explanation: string; // Erklärung (wenn falsch)
}

export interface QuizData {
  title: string; // Quiz-Titel
  questions: QuizQuestion[]; // Array von Fragen
}
```

### 3.3 Datenfluss

```
OCEANS_DATA (TypeScript)
    ↓
Ozeaninfo-Komponente
    ↓
User navigiert zum Quiz
    ↓
Quiz-Service lädt quizfragen.json (HTTP)
    ↓
Quiz-Komponente zeigt Fragen
    ↓
User antwortet
    ↓
QuizResultService speichert Ergebnis
    ↓
Sprechblase wird benachrichtigt
```

---

## 4. Services

### 4.1 QuizService (quizService.service.ts)

**Zweck**: Laden von Quiz-Daten aus JSON-Datei mit Caching

**Methoden**:

- `getQuizData(oceanId: string): Observable<QuizData | null>`
  - Lädt Quiz-Fragen für einen Ozean
  - Cached Ergebnisse um redundante HTTP-Requests zu vermeiden
  - Verwendet HTTP-Client zum Laden aus `public/assets/quiz/quizfragen.json`

**Cache-Mechanismus**: `Map<string, QuizData>`

**Fehlerbehandlung**: Logs errors, returns null on failure

[TODO: Code-Diagramm für Service-Datenfluss]

### 4.2 QuizResultService (quizResultService.service.ts)

**Zweck**: Verwalten von Quiz-Ergebnissen und Kommunikation zwischen Quiz und Sprechblase

**Eigenschaften**:

- `quizResult$: Observable<string>` - Observable für Quiz-Ergebnisse
- Nutzt `BehaviorSubject<string>` intern

**Methoden**:

- `setQuizResult(score: number, total: number): void`
  - Setzt Quiz-Ergebnis im Format "score|total"
  - Speichert auch in sessionStorage
  - Triggert Observable für alle Subscriber
- `getQuizResult(): string`
  - Gibt aktuellen Wert des BehaviorSubject zurück
- `clearQuizResult(): void`
  - Löscht Quiz-Ergebnis und entfernt aus sessionStorage

[TODO: Sequence-Diagramm für Service-Kommunikation]

---

## 5. Komponenten

### 5.1 AppComponent (app.ts)

**Zweck**: Root-Komponente

**Funktion**:

- Bootstrapt die Applikation
- Stellt Provider bereit (Router, HttpClient, Zone Change Detection)

**Template**: Einfache `<router-outlet>`

### 5.2 Startseite (startseite/startseite.ts)

**Zweck**: Willkommenseite und Navigation zu Ozeanen

**Features**:

- Welcome-Text
- Weltkartenild mit weißem Rahmen
- Links zu den 5 Ozeanen

**Daten**: Verwendet `OCEANS_DATA` aus ozean.interface.ts

**Styling**: Bootstrap Grid, responsive Layout

[TODO: Mockup/Screenshot einfügen]

### 5.3 HeaderLeiste (headerleiste/headerleiste.ts)

**Zweck**: Globale Navigation

**Features**:

- Logo mit Link zur Startseite
- Responsive Design

**Imports**: `RouterModule` für `routerLink`

**Template**: Logo mit `routerLink="/"`

### 5.4 Ozeaninfo (ozeaninfo/ozeaninfo.ts)

**Zweck**: Detailseite für einen Ozean

**Logik**:

```
ngOnInit()
  ├─ Liest :oceanId aus Route
  ├─ Sucht Ozean in OCEANS_DATA
  └─ Generiert dynamischen quizRoute

User sieht:
  ├─ Ozeanname & Beschreibung
  ├─ Bildergalerie (Carousel)
  ├─ Liste von Nebenmeeren
  └─ "Zum Quiz"-Button
```

**Route-Parameter**: `:oceanId`

**Dynamische Links**: `[routerLink]="/ozeane/{{oceanId}}/quiz"`

**Carousel**: Zeigt 3 Bilder aus `picturesLinkList`

**CSS-Media-Queries**: Responsive Anpassung (verhindert Maskottchen-Überlappung)

[TODO: Flowchart für Ozeaninfo-Logik]

### 5.5 Quiz (quiz/quiz.ts)

**Zweck**: Quiz-Spiel für einen Ozean

**State-Variablen**:

```typescript
quizData: QuizData | null; // Geladene Quiz-Daten
currentQuestion: number = 0; // Aktuelle Frage (0-Index)
selectedAnswer: number | null; // Ausgewählte Antwort
showResult: boolean = false; // Zeigt Erklärung?
showResults: boolean = false; // Zeigt Ergebnisseite?
score: number = 0; // Punkte erreicht
```

**Methoden**:

- `ngOnInit()`: Lädt Quiz-Daten via Service
- `selectAnswer(index)`: Speichert Auswahl
- `submitAnswer()`: Prüft Antwort, zählt Punkte
- `nextQuestion()`: Nächste Frage
- `finishQuiz()`: Speichert Ergebnis via QuizResultService

**UI-States**:

1. **Frage-Seite**: Frage + 4 Buttons für Antworten
2. **Ergebnis-Seite**: Grüne Markierung (richtig) / Rote (falsch) + Erklärung
3. **Schluss-Seite**: Punktzahl, Prozentsatz, Motivationsnachricht

**Styling**:

- Purple Gradient Background
- Responsive Button-Grid (1 Spalte mobil, 2 Spalten Desktop)
- Farbcodierte Buttons (gelb=auswählung, grün=richtig, rot=falsch)

[TODO: Quiz-Zustandsdiagramm]

### 5.6 Maskottchen & Sprechblase (maskottchen/sprechblase.ts)

**Zweck**: Interaktives Maskottchen-Element mit dynamischen Nachrichten

**Features**:

- Verfolgung aktueller Route
- Dynamische Nachrichten basierend auf Kontext
- Anzeige von Quiz-Ergebnissen
- DOM-Messung für CSS-Variablen-Berechnung

**Text nach Route**:

```
/ (Startseite):
  "Na, Lust auf eine spannende Reise durch die Welt der Erde und Ozeane?<br><br>
   Am Ende kannst du dein Wissen sogar mit einem Quiz testen!
   Wenn du wieder zurück auf diese Seite willst, musst du nur auf das
   Logo oben in der Mitte der Seite klicken. Viel Erfolg!"

/ozeane/:id:
  "Wow! Der {{oceanName}} ist faszinierend, nicht wahr?
   Jetzt teste dein Wissen!"

/ozeane/:id/quiz (während Quiz):
  "Viel Erfolg beim Quiz! Du schaffst das!"

/ozeane/:id/quiz (nach Quiz):
  "Wow, du hast {{score}} von {{total}} Punkten erreicht!"
```

**Implementierungsdetails**:

1. **Route-Überwachung**:

   - Subscribes zu `router.events` (filtert `NavigationEnd`)
   - Ruft `updateTextByRoute()` auf

2. **Quiz-Result-Überwachung**:

   - Subscribes zu `quizResultService.quizResult$`
   - Triggert Change Detection via `ChangeDetectorRef.detectChanges()`

3. **CSS-Variable-Berechnung**:

   ```typescript
   // Misst Sprechblase-Höhe für Layoutanpassung
   --sprechblase-height: 150px
   --sprechblase-bottom: 100px
   ```

   - Nutzt MutationObserver um Text-Änderungen zu verfolgen
   - Listens zu Resize-Events
   - Aktualisiert CSS-Variablen für responsive Positionierung

4. **Template** (sprechblase.html):
   ```html
   <p [innerHTML]="sprechblasenText"></p>
   @if (quizScore) {
   <p>{{ quizScore }}</p>
   }
   ```
   - Nutzt `[innerHTML]` um `<br>` Tags zu unterstützen

[TODO: Interaktions-Diagramm für Sprechblase]

---

## 6. Datenquellen

### 6.1 Statische Daten

**OCEANS_DATA** (ozean.interface.ts)

- 5 Ozean-Objekte
- Jeder enthält: id, name, description, picturesLinkList, nebenmeera
- In TypeScript definiert und nicht vom Server abhängig

### 6.2 Externe Daten

**quizfragen.json** (public/assets/quiz/)

```json
{
  "pazifik": {
    "title": "Pazifik Quiz",
    "questions": [...]
  },
  "atlantik": {...},
  "indischer": {...},
  "arktis": {...},
  "antarktis": {...}
}
```

Struktur pro Ozean:

- `title`: Quiz-Titel
- `questions`: Array von Fragen mit options, correct-Index, explanation

### 6.3 Bilder

**Pfade**: `/pazifik/`, `/atlantik/`, usw. in `public/`

**Format**: WebP (optimal), JPG (Fallback)

---

## 7. Lebenszyklen & Datenfluss

### 7.1 App-Initialisierung

```
main.ts
  ├─ bootstrapApplication(AppComponent, appConfig)
  ├─ appConfig stellt bereit:
  │   ├─ Router (app.routes)
  │   ├─ HttpClient (für Quiz-Service)
  │   └─ Zone Change Detection
  └─ App lädt
```

### 7.2 Navigations-Datenfluss

```
Startseite
  └─ User klickt Ozean
    └─ Router navigiert zu /ozeane/:oceanId
      └─ Ozeaninfo lädt
        └─ ActivatedRoute liefert oceanId
          └─ OCEANS_DATA wird gefiltert
            └─ Ozeaninfo rendert
              └─ User sieht "Zum Quiz" Button
                └─ User klickt Button
                  └─ Router navigiert zu /ozeane/:oceanId/quiz
                    └─ Quiz lädt
                      └─ QuizService.getQuizData(:oceanId)
                        └─ HTTP GET quizfragen.json
                          └─ Quiz rendert erste Frage
```

### 7.3 Quiz-Completion-Datenfluss

```
User beantwortet alle Fragen
  └─ finishQuiz() wird aufgerufen
    └─ QuizResultService.setQuizResult(score, total)
      ├─ BehaviorSubject.next('score|total')
      ├─ sessionStorage.setItem('quizScore', ...)
      └─ Sprechblase erhält Update
        └─ quizResult$ Observable emittet
          └─ Sprechblase.updateTextByRoute()
            └─ Text wird zu "Wow, du hast X von Y Punkten erreicht"
              └─ [innerHTML] rendert Änderung
                └─ Sprechblase zeigt Ergebnis
```

[TODO: Detaillierte Sequenzdiagramme]

---

## 8. Fehlerbehandlung

### 8.1 Quiz-Daten nicht gefunden

**Szenario**: JSON-Datei nicht erreichbar

**Handling**:

```typescript
// QuizService
this.quizService.getQuizData(oceanId).subscribe({
  next: (data) => {
    if (!data) {
      this.errorMessage = `Quiz-Daten für "${oceanId}" nicht gefunden`;
    }
  },
  error: (err) => {
    this.errorMessage = `Fehler beim Laden: ${err.message}`;
  },
});
```

**User-Feedback**: `errorMessage` wird im Template angezeigt

### 8.2 Ungültige Ocean-ID

**Szenario**: User navigiert zu `/ozeane/ungueltig`

**Handling**:

- Ozeaninfo sucht in OCEANS_DATA
- Findet nichts
- Zeigt Default-Text oder leere Seite
- Sollte hinzugefügt werden: 404-Komponente oder Redirect

[TODO: Fehlerbehandlungs-Verbesserungen dokumentieren]

### 8.3 Browser-Speicher

**sessionStorage**: Speichert Quiz-Ergebnis für aktuelle Session

- Wird gelöscht wenn Browser geschlossen
- Fallback für Observable-Kommunikation

---

## 9. Styling & Layout

### 9.1 Responsive Design

**Breakpoints** (Bootstrap):

- xs: < 576px
- sm: ≥ 576px
- md: ≥ 768px
- lg: ≥ 992px (wichtig für Maskottchen-Layout)
- xl: ≥ 1200px

**Spezielle Media Query** (ozeaninfo.css):

```css
@media (max-width: 1070px) {
  /* Carousel-Anpassung um Maskottchen zu vermeiden */
}
```

### 9.2 Farb-Palette

| Element | Farbe             | Verwendung          |
| ------- | ----------------- | ------------------- |
| Primary | #667eea / #764ba2 | Quiz-Gradient       |
| Success | #28a745           | Richtige Antwort    |
| Danger  | #dc3545           | Falsche Antwort     |
| Warning | #ffc107           | Ausgewählte Antwort |
| Info    | #ff6b9d           | Quiz-Score Text     |

### 9.3 Typographie

[TODO: Typography guide - Font-families, sizes, weights]

### 9.4 CSS-Variablen

```css
--sprechblase-height: 150px    /* Dynamisch berechnet */
--sprechblase-bottom: 100px    /* Dynamisch berechnet */
```

---

## 10. Performance & Optimierung

### 10.1 Caching-Strategie

**Quiz-Daten**:

- Cache im Service
- Verhindert mehrfache HTTP-Requests für selben Ozean
- `Map<string, QuizData>`

**Bilder**:

- WebP Format (kleiner als JPG)
- Browser-Cache (long-lived assets)

### 10.2 Change Detection

**Strategy**: Default (nicht OnPush)

**Probleme-Workaround**:

- Quiz-Result wird über sessionStorage ODER Observable kommuniziert
- `ChangeDetectorRef.detectChanges()` wird manuell aufgerufen bei Observable-Events

[TODO: Performance-Profiling & Optimierungsempfehlungen]

---

## 11. Sicherheit

### 11.1 XSS Prevention

**Potentielles Risiko**: `[innerHTML]` in Sprechblase

**Mitigation**:

- Text wird nur von internen Komponenten generiert
- Keine User-Input-Sanitization nötig (derzeit)
- Sollte überwacht werden wenn User-Generated-Content hinzukommt

### 11.2 CORS

**API-Calls**: Nur lokal zu `public/assets/`

- Keine externen API-Calls
- CORS-Probleme nicht zu erwarten

### 11.3 SessionStorage

**Daten**: Quiz-Ergebnis in sessionStorage

- Nicht sensitive
- Lokal begrenzt
- OK für dieser Use-Case

[TODO: Security Audit & Best Practices Review]

---

## 12. Testing

### 12.1 Unit Tests

[TODO: Test-Strategie und -Beispiele]

### 12.2 E2E Tests

[TODO: Cypress/Playwright Test-Szenarien]

### 12.3 Test Coverage

[TODO: Coverage-Bericht und -Ziele]

---

## 13. Deployment & Hosting

### 13.1 Build-Prozess

```bash
npm run build      # Production-Build
```

**Output**: `dist/eol-earth-oceans-learning-app/`

### 13.2 Hosting-Anforderungen

- Static File Server (z.B. Netlify, Vercel, GitHub Pages)
- Keine Server-Side-Rendering nötig
- SPA mit Client-Side-Routing

### 13.3 Environment-Konfiguration

[TODO: Environment files (dev, staging, prod)]

---

## 14. Abhängigkeiten

### 14.1 Runtime Dependencies

| Paket                     | Version | Zweck                |
| ------------------------- | ------- | -------------------- |
| @angular/core             | ^20.3.0 | Framework            |
| @angular/common           | ^20.3.0 | Common Module        |
| @angular/router           | ^20.3.0 | Routing              |
| @angular/platform-browser | ^20.3.0 | Browser Platform     |
| bootstrap                 | ^5.3.8  | CSS Framework        |
| rxjs                      | ~7.8.0  | Reactive Programming |

### 14.2 Development Dependencies

| Paket                 | Version | Zweck               |
| --------------------- | ------- | ------------------- |
| @angular/cli          | ^20.3.8 | CLI                 |
| @angular/compiler-cli | ^20.3.0 | TypeScript Compiler |
| typescript            | ~5.6.0  | TypeScript          |

[TODO: Vollständige dependency tree]

---

## 15. Bekannte Probleme & Verbesserungen

### 15.1 Offene Bugs

[TODO: Liste von bekannten Bugs mit Priorität und Lösungsansätze]

### 15.2 Geplante Features

- [ ] User-Profile / Fortschrittspeicherung (localStorage)
- [ ] Leaderboard
- [ ] Admin-Panel zum Bearbeiten von Quiz-Fragen
- [ ] Mehrsprachige Unterstützung (i18n)
- [ ] Offline-Funktionalität (PWA)
- [ ] Sound-Effekte & Musik
- [ ] Achievements/Badges

### 15.3 Refactoring-Ideen

- [ ] Quiz-Logik in separaten Service extrahieren
- [ ] State Management mit NgRx (für größere Apps)
- [ ] Komponenten-Library für Wiederverwendung
- [ ] Storybook für Komponenten-Dokumentation

---

## 16. Dokumentation & Referenzen

### 16.1 Code-Dokumentation

- **Inline Comments**: Vorhanden in komplexen Logiken
- **JSDoc**: [TODO: Hinzufügen für bessere IDE-Unterstützung]

### 16.2 Nützliche Links

- [Angular Documentation](https://angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [Bootstrap 5 Documentation](https://getbootstrap.com)

### 16.3 Projektplanung

[TODO: Links zu:

- UML-Diagrammen
- Wireframes
- User Stories
- Sprint-Planung]

---

## 17. Beiträger & Kontakt

### 17.1 Team

[TODO: Beiträger-Liste]

### 17.2 Support & Kontakt

[TODO: Support-Kanäle]

---

## Anhang: Dateistruktur

```
EOL-EarthOceansLearningApp/
├── src/
│   ├── app/
│   │   ├── app.ts                        # Root Component
│   │   ├── app.config.ts                 # App Konfiguration
│   │   ├── app.routes.ts                 # Route Definitionen
│   │   ├── app.css                       # Globale Styles
│   │   ├── ozean.interface.ts            # Ozean Datenmodell + OCEANS_DATA
│   │   ├── quizfrage.interface.ts        # Quiz Interfaces
│   │   ├── quizService.service.ts        # Quiz Data Service
│   │   ├── quizResultService.service.ts  # Quiz Result Manager
│   │   │
│   │   ├── headerleiste/
│   │   │   ├── headerleiste.ts
│   │   │   ├── headerleiste.html
│   │   │   └── headerleiste.css
│   │   │
│   │   ├── startseite/
│   │   │   ├── startseite.ts
│   │   │   ├── startseite.html
│   │   │   └── startseite.css
│   │   │
│   │   ├── ozeaninfo/
│   │   │   ├── ozeaninfo.ts
│   │   │   ├── ozeaninfo.html
│   │   │   └── ozeaninfo.css
│   │   │
│   │   ├── quiz/
│   │   │   ├── quiz.ts
│   │   │   ├── quiz.html
│   │   │   └── quiz.css
│   │   │
│   │   └── maskottchen/
│   │       ├── maskottchen.ts
│   │       ├── maskottchen.html
│   │       ├── maskottchen.css
│   │       └── sprechblase/
│   │           ├── sprechblase.ts
│   │           ├── sprechblase.html
│   │           └── sprechblase.css
│   │
│   ├── index.html                  # HTML Entry Point
│   ├── main.ts                     # Bootstrap Entry Point
│   └── styles.css                  # Global Styles
│
├── public/
│   ├── assets/
│   │   ├── quiz/
│   │   │   └── quizfragen.json     # Quiz-Fragen Daten
│   │   ├── pazifik/                # Pazifik-Bilder
│   │   ├── atlantik/               # Atlantik-Bilder
│   │   ├── indischer/              # Indischer Ozean-Bilder
│   │   ├── arktis/                 # Arktis-Bilder
│   │   └── antarktis/              # Antarktis-Bilder
│   └── platzhalter.webp            # Placeholder-Bilder
│
├── angular.json                    # Angular CLI Konfiguration
├── tsconfig.json                   # TypeScript Konfiguration
├── package.json                    # NPM Abhängigkeiten
├── README.md                       # Projekt-ReadMe
└── DOKUMENTATION.md                # Diese Datei
```

---

**Dokumentation erstellt am**: 5. Dezember 2025  
**Dokumentations-Version**: 1.0  
**Status**: [TODO] Abschnitte sind noch zu ergänzen mit Diagrammen und Details aus der Projektplanung
