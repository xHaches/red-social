import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { StateService } from '../../../state/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {

  users: any[] = [];

  constructor(
    private userService: UserService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsersfromUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  viewUser(user: User) {
    this.router.navigate(['/user-details', user.id])
  }

}
