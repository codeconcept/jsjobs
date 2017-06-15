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
  jbbToken = null;
  JBB_TOKEN_NAME = 'jbb-token';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.refreshFlags();
  }  

  refreshFlags() {
    if(this.authService.userIsLoggedIn()) {
      this.isAuthenticated = true;
      this.welcomeMessage = 'Bienvenue';
      const jbbToken = JSON.parse(localStorage.getItem(this.JBB_TOKEN_NAME));
      console.log('jbbToken: ', jbbToken);
      this.jbbToken = this.authService.decodeToken(jbbToken.token);
      console.log('jbbToken: ', this.jbbToken);
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
    this.jbbToken = data;
    localStorage.setItem(this.JBB_TOKEN_NAME, JSON.stringify(data));
    this.router.navigate(['/profile']);
  }

  handleLoginFailure(error) {
    console.error('failure: ', error);
  }

}
