import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  loading = false;
  submitted = false;
  form = new FormGroup({
    projectName: new FormControl(''),
    description: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private toast: ToastService,
    public modal: NgbActiveModal) {
    this.activatedRoute.queryParams.subscribe(params => {
      const name = params['name'];
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      projectName: ['',
        [Validators.required,
        Validators.maxLength(30)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const value = {
        name: this.form.value.projectName,
        region: 'eu-west-2'
      };

      this.projectService.createProject(value).subscribe(res => {
        if (res && res.message) {
          this.modal.close(res);
        }
      }, err => {
        if (err) {
          this.modal.close(err);
        }
      });
    }
  }

}
