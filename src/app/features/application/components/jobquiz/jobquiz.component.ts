import { Component, OnInit } from '@angular/core';
import { JobQuizService } from 'src/app/core/services/jobquiz/jobquiz.service';

@Component({
  selector: 'app-job-quiz',
  templateUrl: './jobquiz.component.html',
  styleUrls: ['./jobquiz.component.css']
})
export class JobQuizComponent implements OnInit {
  jobDescription = 'We are looking for a Software Developer to build scalable web applications using React and Spring Boot. Responsibilities include coding, testing, debugging, and collaborating with cross-functional teams.' ;
  questions: string[] = [];
  answers: string[] = [];  // Tableau pour stocker les réponses

  constructor(private quizService: JobQuizService) {}

  ngOnInit(): void {
    this.quizService.generateQuestions(this.jobDescription).subscribe(
      (response) => {
        this.questions = response.questions;
        this.answers = Array(this.questions.length).fill(''); // Initialiser les réponses avec des chaînes vides
      },
      (error) => {
        console.error('Error generating questions:', error);
      }
    );
  }

  // Fonction pour soumettre les réponses (optionnelle si tu veux évaluer les réponses)
  submitAnswers(): void {
    console.log(this.answers);  // Afficher les réponses dans la console
  }
}
