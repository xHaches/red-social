import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../state/services/state.service';
import { User } from '../../../interfaces/user.interface';
import { State } from '../../../interfaces/state.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  user!: User;

  ngOnInit(): void {
    this.stateService.subscribe((state: State) => {
      this.user = state.user;
      console.log(this.user);
    });
  }

}
