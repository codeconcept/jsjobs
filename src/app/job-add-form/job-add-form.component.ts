import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cc-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: -1,
      title: '',
      company: '',
      city: '',
      zipcode: 35,
      description: '',
      contract: '',
      salary: 0,
      currency: 'euros',
      startdate: new Date(),
      experience: '',
      status: '',
      area: '',
      field: '',
      publishdate: new Date(),
      lastupdate: new Date()
    })
  }

  createJob() {
    console.log(this.form.value);
  }

}
