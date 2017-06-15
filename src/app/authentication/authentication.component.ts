import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  login(formData) {
    console.log(formData);
  }

}
