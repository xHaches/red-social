import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../state/services/state.service';
import { User } from '../../../interfaces/user.interface';
import { State } from '../../../interfaces/state.interface';
import { UserService } from '../../services/user.service';
import { TechnologiesService } from 'src/app/shared/services/technologies.service';
import { Techonology } from '../../../interfaces/technology.interface';
import { FriendsService } from '../../../shared/services/friends.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  selectedUser: any = {};
  technologies: any = [];
  friendship: any = false;

  subscription: Subscription = new Subscription();

  me!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private friendsService: FriendsService,
    private technologiesService: TechnologiesService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.subscription.add(this.userService.getUserById(id).subscribe((user: User) => {
      this.selectedUser = user;
      console.log(this.selectedUser);
      this.subscription.add(this.stateService.subscribe((state: State) => {
        this.me = state.user;
        this.subscription.add(this.friendsService.getFriendFromUser(id, state.user.id).subscribe((friendship: User) => {
          this.friendship = friendship;
        }));
      }));
    }));
    this.subscription.add(this.technologiesService.getTechnologies().subscribe((technologies: Techonology[]) => {
      this.technologies = technologies;
    }));
  }

  sendFriendrequest() {
    this.subscription.add(
      this.friendsService.newFriend(this.me.id, this.selectedUser.id).subscribe((resp: any) => {
        Swal.fire('Solicitud enviada!');
      }));
  }

  deleteFriend() {
    this.subscription.add(
      this.friendsService.deleteFriend(this.friendship.id).subscribe((resp: any) => {
      Swal.fire('Eliminado');
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
