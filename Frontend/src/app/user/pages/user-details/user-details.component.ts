import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../../state/services/state.service';
import { User } from '../../../interfaces/user.interface';
import { State } from '../../../interfaces/state.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  selectedUser!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.userService.getUserById(id).subscribe((user: User) => {
      this.selectedUser = user;
      console.log(this.selectedUser);
    });
  }

  

}
