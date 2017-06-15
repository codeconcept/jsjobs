import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
  

  login(credentials) {
    this.authService.login(credentials)
                    .subscribe(
                      data => this.handleLoginSuccess,
                      error => this.handleLoginFailure
                    )
  }

  handleLoginSuccess(data) {
    console.log('success: ', data);
  }

  handleLoginFailure(error) {
    console.error('failure: ', error);
  }

}
