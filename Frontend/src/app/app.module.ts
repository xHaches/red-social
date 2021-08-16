import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './shared/interceptors/token.service';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FileValueAccessorDirective } from './shared/directives/form/file-value-accessor.directive';
import { FileValidatorDirective } from './shared/directives/form/file-validator.directive';
import { MeetComponent } from './user/pages/meet/meet.component';
import { FriendsComponent } from './user/pages/friends/friends.component';
import { UserDetailsComponent } from './user/pages/user-details/user-details.component';
import { FriendRequestsComponent } from './user/pages/friend-requests/friend-requests.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeaderComponent,
    MeetComponent,
    FriendsComponent,
    FileValueAccessorDirective,
    FileValidatorDirective,
    UserDetailsComponent,
    FriendRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
