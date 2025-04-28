import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/QuizService/quiz-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-quiz',
  templateUrl: './jobquiz.component.html',
  styleUrls: ['./jobquiz.component.css']
})
export class JobQuizComponent implements OnInit {

  quiz: any[] = []; // Contiendra les questions du quiz
  userAnswers: string[] = []; // Stocke les réponses de l'utilisateur
  score: number | null = null; // Score final après soumission
  errorMessage: string | null = null; // Message d'erreur à afficher

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  /*ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.quizService.generateQuiz(jobId).subscribe(
        response => {
          console.log('Generated Quiz:', response);

          try {
            this.quiz = JSON.parse(response.quiz);
            console.log('Quiz Parsed:', this.quiz);
            // Initialiser les réponses utilisateur vides
            this.userAnswers = new Array(this.quiz.length).fill('');
          } catch (e) {
            console.error('Erreur de parsing:', e);
            this.errorMessage = "Erreur lors du traitement du quiz.";
          }
        },
        error => {
          console.error('Erreur:', error);
          this.errorMessage = "Erreur lors du chargement du quiz. Veuillez réessayer.";
        }
      );
    } else {
      this.errorMessage = "ID de job manquant dans l'URL.";
    }
  }*/

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const jobId = params.get('id');
        if (jobId) {
          this.quizService.generateQuiz(jobId).subscribe(
            response => {
              console.log('Generated Quiz:', response);
    
              try {
                this.quiz = JSON.parse(response.quiz);
                console.log('Quiz Parsed:', this.quiz);
                this.userAnswers = new Array(this.quiz.length).fill('');
                this.score = null; // Reset score if navigating to a new quiz
              } catch (e) {
                console.error('Erreur de parsing:', e);
                this.errorMessage = "Erreur lors du traitement du quiz.";
              }
            },
            error => {
              console.error('Erreur:', error);
              this.errorMessage = "Erreur lors du chargement du quiz. Veuillez réessayer.";
            }
          );
        } else {
          this.errorMessage = "ID de job manquant dans l'URL.";
        }
      });
    }
    
  // Fonction appelée lorsque l'utilisateur sélectionne une réponse
  selectAnswer(questionIndex: number, selectedOption: string): void {
    this.userAnswers[questionIndex] = selectedOption;
  }

  // Fonction pour soumettre les réponses
  submitQuiz(): void {
    let correctCount = 0;
    for (let i = 0; i < this.quiz.length; i++) {
      if (this.userAnswers[i] === this.quiz[i].answer) {
        correctCount++;
      }
    }
    this.score = correctCount;
    console.log('Score:', this.score);

// SAUVEGARDER dans localStorage
if (this.score !== null) {
  localStorage.setItem('quizScore', this.score.toString());
}

  }


  
}
