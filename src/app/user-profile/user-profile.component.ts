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
  jobs = [];
  adsTitle = '';

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
      // admin needs to see all ads
      if(this.isAdmin) {
        this.loadAdsWithoutFilter();
      } else {
        this.loadAds(this.userEmail);
      }
    }
  }

  loadAds(userEmail) {
    this.jobService.getJobsByUserEmail(userEmail)
                    .subscribe(
                      data => this.displayAds(data.jobs),
                      err => console.error(err)
                    )
  }

  loadAdsWithoutFilter() {
    this.jobService.getJobs()
                    .subscribe(
                      data => this.displayAds(data), // directly return an array
                      err => console.error(err)
                    )
  }

  displayAds(jobs) {
    console.log('jobs ', jobs);
    this.jobs = jobs;
    switch(this.jobs.length) {
      case 0:
        this.adsTitle = 'Aucune annonce postée à ce jour';
        return;
      case 1:
        this.adsTitle = '1 annonce postée';
        return;
      default:
        this.adsTitle = `${this.jobs.length} annonces postées`;
    }
  }

}
