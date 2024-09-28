import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  steps = [
    {
      question: 'My favourite movie genre is:',
      type: 'checkbox',
      subtext: "(Check all that apply)",
      options: ['Action', 'Horror', 'Drama', 'Thriller', 'Science Fiction', 'Fantasy', 'Western', 'Romantic', 'Comedy', 'Kevin Heart Buddy Comedy', 'Noir', 'None of the above']
    },
    {
      question: 'How long have you been an angular developer?',
      type: 'radio',
      options: ['0-3 years', '4-6 years', '7 or more years']
    },
    {
      question: 'What is your favorite movie?',
      type: 'text',
      subtext: '(If you have more than one favorite movie, select Add Favorite Movie to enter its details.)',
      placeholder: 'Type your answer here...'
    },
    {
      question: 'What’s your favorite movie snack?',
      type: 'radio',
      options: ['Popcorn', 'Junior Mints', 'Skittles', 'Nachos', 'Milk Duds', 'I only watch Criterion Collection films at Arthouses that disallow snacks because there might be a crinkling sound that disrupts other patrons.']
    },
    {
      question: 'What is Jerry Seinfeld’s address in Seinfeld?',
      type: 'address',
    },
  ];

  currentStep: number = 1;
  totalSteps: number = this.steps.length;
  movies = [
    { title: '', releaseYear: '' }
  ];

  formData: any = {
    genres: [], 
    developerExperience: '', 
    favoriteMovie: '', 
    movieSnack: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: ''
    }
  };

  isStepValid(): boolean {
    const step = this.steps[this.currentStep - 1];
  
    switch (step.type) {
      case 'checkbox':
        return this.formData.genres.length > 0; // At least one genre selected
      case 'radio':
        if (this.currentStep === 2) {
          return !!this.formData.developerExperience; // Developer experience is selected
        }
        return !!this.formData.movieSnack; // Movie snack is selected
      case 'text':
        return this.movies.some((movie) => movie.title && movie.releaseYear); // At least one movie has title and year
      case 'address':
        const { address1, city, state, zipcode } = this.formData.address;
        return address1 && city && state && zipcode; // All address fields must be filled
      default:
        return true;
    }
  }
  constructor(private router: Router) {}

  calculateProgress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  nextStep() {
    if (this.isStepValid() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      console.log('Quiz Answers:', this.formData);
      this.router.navigate(['/quiz-completion']);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  toggleGenre(option: string) {
    if (this.formData.genres.includes(option)) {
      this.formData.genres = this.formData.genres.filter((o: string) => o !== option);
    } else {
      this.formData.genres.push(option);
    }
  }
  
  addMovie() {
    this.movies.push({ title: '', releaseYear: '' });
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }
}
