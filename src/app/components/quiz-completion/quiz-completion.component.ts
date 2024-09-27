import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-completion',
  standalone: true,
  imports: [],
  templateUrl: './quiz-completion.component.html',
  styleUrl: './quiz-completion.component.scss'
})
export class QuizCompletionComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
