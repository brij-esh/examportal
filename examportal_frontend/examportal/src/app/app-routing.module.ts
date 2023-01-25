import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { ExamCategoriesComponent } from './components/admin/exam-categories/exam-categories.component';
import { QuizComponent } from './components/admin/quiz/quiz.component';
import { UpdateCategoryComponent } from './components/admin/update-category/update-category.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guards/admin.guard';
import { UserGuard } from './services/guards/user.guard';
import { ViewQuizQuestionComponent } from './components/admin/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/admin/update-question/update-question.component';
import { WelcomeUserComponent } from './components/user/welcome-user/welcome-user.component';
import { ShowQuizComponent } from './components/user/show-quiz/show-quiz.component';
import { QuizStartupPageComponent } from './components/user/quiz-startup-page/quiz-startup-page.component';
import { QuizPageComponent } from './components/user/quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    // pathMatch:'full',
    canActivate:[AdminGuard],

    children:[
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'update',
        component:UpdateUserComponent
      },
      {
        path:'categories',
        component:ExamCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoriesComponent
      },
      {
        path:'quiz',
        component:QuizComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'update-category/:categoryId',
        component:UpdateCategoryComponent
      },
      {
        path:'update-quiz/:quizId',
        component:UpdateQuizComponent
      },
      {
        path:'view-quiz-question/:quizId/:title',
        component:ViewQuizQuestionComponent
      },
      {
        path:'add-question/:quizId',
        component:AddQuestionComponent
      },
      {
        path:'update-question/:questionId',
        component:UpdateQuestionComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[UserGuard],

    children:[
      {
        path:'',
        component:WelcomeUserComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'quiz/:categoryId/:categoryTitle',
        component:ShowQuizComponent
      },
      {
        path:'quiz-startup/:quizId',
        component:QuizStartupPageComponent
      },
    ]
  },
  {
    path:'quiz-start/:quizId',
    component:QuizPageComponent,
    canActivate:[UserGuard],
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
