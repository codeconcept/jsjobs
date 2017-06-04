import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddFormComponent } from './job-add-form.component';

describe('JobAddFormComponent', () => {
  let component: JobAddFormComponent;
  let fixture: ComponentFixture<JobAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
