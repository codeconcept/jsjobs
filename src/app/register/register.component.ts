import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'cc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  register(formData) {
    this.authService.register(formData)
                    .subscribe(
                      data => {
                        this.handleRegisterSuccess(data)
                      },
                      error => {
                        this.handleRegisterFailure(error)                        
                      }
                    )
  }

  handleRegisterSuccess(data) {
    // console.log('success: ', data);
    this.router.navigate(['/']);
  }

  handleRegisterFailure(error) {
    console.error('failure: ', error);
  }

}
