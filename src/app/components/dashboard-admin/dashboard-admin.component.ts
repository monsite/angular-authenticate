import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {


user!:User
  constructor(private tokenServ:TokenStorageService,
    private userServ:UsersService) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenServ.getUser()) 
    this.userServ.getOneUser(this.user).subscribe(data=>console.log('daaaaaaataaaaaaa',data))
    console.log('this user is current',this.user.role)
  }
}
