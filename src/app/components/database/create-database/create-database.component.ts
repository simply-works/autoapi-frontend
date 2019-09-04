import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ReturnStatement } from '@angular/compiler';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-database',
  templateUrl: './create-database.component.html',
  styleUrls: ['./create-database.component.css']
})
export class CreateDatabaseComponent implements OnInit {
  loading = false;
  submitted = false;
  @Input() projectId;

  form = new FormGroup({
    databaseName: new FormControl(''),
    description: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private toastService: ToastService,
    public modal: NgbActiveModal,
    public config: NgbModalConfig) {
    this.activatedRoute.queryParams.subscribe(params => {
      const name = params['name'];
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      databaseName: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const requestData = this.createRequestData(this.form.value);
      this.databaseService.createDatabases(requestData).subscribe(res => {
        if (res && res.message) {
          this.modal.close(res);
        }
      }, err => {
        this.modal.close(err);
      });
    }
  }

  createRequestData(data) {
    const databaseDetails = {
      host: 'hostname',
      name: data.databaseName,
      user: 'username',
      pass: 'pass',
      port: 3066,
      project_id: this.projectId,
      status: 'active'
    };
    return databaseDetails;

  }
}
