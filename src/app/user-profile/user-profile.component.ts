import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()) {
      const jbbToken = JSON.parse(localStorage.getItem('jbb-token'));
      this.decodedToken = this.authService.decodeToken(jbbToken.token);
      console.log(this.decodedToken);
      if(this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

}
