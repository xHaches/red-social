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
import { QualificationService } from '../../services/qualification.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  selectedUser: any = {};
  technologies: any = [];
  friendship: any = false;

  technologiesClassIterable: any[] = [];

  toggleStar(itemsArray: any[], itemIndex: number) {
    itemsArray.forEach(arrItem => {
      if(arrItem.index <= itemIndex) {
        console.log(arrItem <= itemIndex);
        arrItem.class = `fas fa-star fa-sm text-yellow-500 mr-1`;
      }
    });
    itemsArray.forEach(arrItem => {
      if(arrItem.index > itemIndex) {
        console.log(arrItem <= itemIndex);
        arrItem.class = `far fa-star fa-sm text-yellow-500 mr-1`;
      }
    });
  }

  subscription: Subscription = new Subscription();

  me!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private friendsService: FriendsService,
    private technologiesService: TechnologiesService,
    private stateService: StateService,
    private qualificationService: QualificationService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!

    // MANEJO DE USUARIO
    this.subscription.add(this.userService.getUserById(id).subscribe((user: User) => {
      this.selectedUser = user;
      console.log(this.selectedUser);
      this.subscription.add(this.stateService.subscribe((state: State) => {
        this.me = state.user;
        this.subscription.add(this.friendsService.getFriendFromUser(id, state.user.id).subscribe((friendship: User) => {
          this.friendship = friendship;
        }));
        this.setUserQualifications();
      }));
    }));
    // MANEJO DE TECNOLOGIAS
    this.subscription.add(this.technologiesService.getTechnologies().subscribe((technologies: Techonology[]) => {
      this.technologies = technologies;
      this.technologiesClassIterable = this.technologies.map((technology :Techonology) => {
        return [0,1,2,3,4].map(number => ({
          title: technology.title,
          index: number,
          class: 'far fa-star fa-sm text-yellow-500 mr-1'
        }));
      });
    }));
  }
  
  setUserQualifications() {
    // MANEJO DE CALIFICACIONES
    this.subscription.add(
      this.qualificationService.getQualificationsByUser(this.me.id).subscribe((resp: any) => {
        this.technologiesClassIterable.forEach((technology, index) => {
          this.toggleStar(technology, resp[index]?.stars - 1 || -1);
        });
      })
    );
  }

  sendQualification(id_technology: number, stars: number) {
    this.qualificationService.sendQualification(this.me.id, id_technology, {stars}).subscribe(resp => {
      console.log(resp);
      Swal.fire('Calificación Guardada')
    });
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
