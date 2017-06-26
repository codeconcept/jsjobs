import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;
  userEmail = '';

  constructor(private authService:AuthService, private jobService: JobService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()) {
      const jbbToken = JSON.parse(localStorage.getItem('jbb-token'));
      this.decodedToken = this.authService.decodeToken(jbbToken.token);
      console.log(this.decodedToken);
      if(this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
      this.userEmail = this.decodedToken.email;
      this.loadAds(this.userEmail);
    }
  }

  loadAds(userEmail) {
    this.jobService.getJobsByUserEmail(userEmail)
                    .subscribe(
                      data => console.log(data),
                      err => console.error(err)
                    )
  }

}
