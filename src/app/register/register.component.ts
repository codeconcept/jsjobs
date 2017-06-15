import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
 
@Component({
  selector: 'cc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  register(formData) {
    this.authService.register(formData);
  }

}
