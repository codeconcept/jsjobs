import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  isAuthenticated = false;
  welcomeMessage = '';
  jbbData = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.refreshFlags();
  }  

  refreshFlags() {
    if(this.authService.userIsLoggedIn()) {
      this.isAuthenticated = true;
      this.welcomeMessage = 'Bienvenue';
      this.jbbData = JSON.parse(localStorage.getItem('jbb-data'));
    }
  }
  

  login(credentials) {
    this.authService.login(credentials)
                    .subscribe(
                      data => {
                        this.handleLoginSuccess(data)
                      },
                      error => {
                        this.handleLoginFailure(error)
                      }
                    )
  }

  handleLoginSuccess(data) {
    console.log('success: ', data);
    this.jbbData = data;
    localStorage.setItem('jbb-data', JSON.stringify(data));
    this.router.navigate(['/']);
  }

  handleLoginFailure(error) {
    console.error('failure: ', error);
  }

}
