import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StateService } from '../../../state/services/state.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { FriendsService } from '../../../shared/services/friends.service';
import { State } from '../../../interfaces/state.interface';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { Friendship, FriendshipWithUser } from '../../../interfaces/friendship.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {

  usersRequests: FriendshipWithUser[] = [];

  me!: User;

  constructor(
    private friendsService: FriendsService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.stateService.state.pipe(
      tap((state: State) => this.me = state.user),
      switchMap((state: State) => this.friendsService.getFriendRequestFromUser(state.user.id)),
    ).subscribe((friendshipWithUser: FriendshipWithUser[]) => {
      console.log(friendshipWithUser);
      this.usersRequests = friendshipWithUser;
    });

  }

  viewUser(user: User) {
    console.log(user);
    this.router.navigate(['/user-details', user.id])
  }

  accept(id_friend: number) {
    Swal.fire('Usuario aceptado').then(_ => {
      this.friendsService.acceptFriend(id_friend, { accepted: true }).subscribe((resp: Friendship) => {
        this.deleteItem(resp);
      });
    });
  }

  reject(id_friend: number) {
    Swal.fire('Ususario rechazado').then(_ => {
      this.friendsService.deleteFriend(id_friend).subscribe((resp: Friendship) => {
        this.deleteItem(resp);
      });
    });
  }
  
  deleteItem(friendship: Friendship) {
    const item = this.usersRequests.find(req => req.id === friendship.id);
    const index = this.usersRequests.indexOf(item!);
    this.usersRequests.splice(index, 1)
  }
}
