import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs = [];
  error = '';

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      error => {
        console.error(error);
        this.error = error;
      }
    );

    this.jobService.jobsSubject.subscribe(data => {
      console.log(data);
      this.jobs = [data, ...this.jobs];    
      console.log('jobs ', this.jobs);
  });
  }

}
