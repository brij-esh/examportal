//Modules 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//interceptors
import { authInterceptorProvider } from './services/auth.interceptor';


//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ExamCategoriesComponent } from './components/admin/exam-categories/exam-categories.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { QuizComponent } from './components/admin/quiz/quiz.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { UpdateCategoryComponent } from './components/admin/update-category/update-category.component';
import { ViewQuizQuestionComponent } from './components/admin/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/admin/update-question/update-question.component';
import { SideBarComponent } from './components/user/side-bar/side-bar.component';
import { WelcomeUserComponent } from './components/user/welcome-user/welcome-user.component';
import { ShowQuizComponent } from './components/user/show-quiz/show-quiz.component';
import { QuizStartupPageComponent } from './components/user/quiz-startup-page/quiz-startup-page.component';
import { QuizPageComponent } from './components/user/quiz-page/quiz-page.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    UpdateUserComponent,
    ExamCategoriesComponent,
    AddCategoriesComponent,
    QuizComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    UpdateCategoryComponent,
    ViewQuizQuestionComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    SideBarComponent,
    WelcomeUserComponent,
    ShowQuizComponent,
    QuizStartupPageComponent,
    QuizPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    
  ],
  providers: [authInterceptorProvider,],
  bootstrap: [AppComponent]
})
export class AppModule { }
