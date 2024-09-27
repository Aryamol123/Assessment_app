import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizCompletionComponent } from './components/quiz-completion/quiz-completion.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:'full'
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"quiz",
        component:QuizComponent
    },
    {
        path:"quiz-completion",
        component:QuizCompletionComponent
    },

];
