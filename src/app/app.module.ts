import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { MessageListComponent } from './components/message/list/message-list.component';
import { MessageCreateComponent } from './components/message/create/message-create.component';
import { DisplayConversationComponent } from './components/display-conversation/display-conversation.component';

import { MessageService } from './service/message.service';
import { AuthService } from './service/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



@NgModule({
  declarations: [
    AppComponent,    
    MessageListComponent,
    DisplayConversationComponent,
    NavbarComponent,
    MessageCreateComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'chatroom'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [MessageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
