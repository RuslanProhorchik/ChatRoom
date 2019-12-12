import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MessageListComponent } from './components/message/list/message-list.component';
import { DisplayConversationComponent } from './components/display-conversation/display-conversation.component';

import { MessageService } from './service/message.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MessageCreateComponent } from './components/message/message-create/message-create.component';

@NgModule({
  declarations: [
    AppComponent,    
    MessageListComponent,
    DisplayConversationComponent,
    NavbarComponent,
    MessageCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'chatroom'),
    AngularFirestoreModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
