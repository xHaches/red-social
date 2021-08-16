import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { FriendsComponent } from './user/pages/friends/friends.component';
import { MeetComponent } from './user/pages/meet/meet.component';
import { UserDetailsComponent } from './user/pages/user-details/user-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'meet', component: MeetComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'user-details/:id', component: UserDetailsComponent   },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
