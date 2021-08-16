import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StateService } from '../../../state/services/state.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { FriendsService } from '../../../shared/services/friends.service';
import { State } from '../../../interfaces/state.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: any[] = [];

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private friendsService: FriendsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.stateService.state.pipe(
      switchMap((state: State) => this.friendsService.getFriendsfromUser(state.user.id))
    ).subscribe((users: User[]) => {
      console.log(users);
    });

  }

  viewUser(user: User) {
    this.router.navigate(['/user-details', user.id])
  }
}