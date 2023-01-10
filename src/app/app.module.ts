import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.prod';
import { TodayComponent } from './today/today.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TomorrowComponent } from './tomorrow/tomorrow.component';
import { AllComponent } from './all/all.component';
import { ModalComponent } from './components/modal/modal.component';
import { NewTodoButtonComponent } from './components/new-todo-button/new-todo-button.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserCardComponent,
    TabsComponent,
    LoginComponent,
    TodayComponent,
    TodoItemComponent,
    TomorrowComponent,
    AllComponent,
    ModalComponent,
    NewTodoButtonComponent,
    TodoListComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
