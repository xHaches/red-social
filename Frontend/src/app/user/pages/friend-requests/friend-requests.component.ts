import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StateService } from '../../../state/services/state.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { FriendsService } from '../../../shared/services/friends.service';
import { State } from '../../../interfaces/state.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {

  users: any[] = [];
  me!: User;

  constructor(
    private friendsService: FriendsService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.stateService.state.pipe(
      switchMap((state: State) => this.friendsService.getFriendRequestFromUser(state.user.id))
    ).subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });

  }

  viewUser(user: User) {
    this.router.navigate(['/user-details', user.id])
  }
}
