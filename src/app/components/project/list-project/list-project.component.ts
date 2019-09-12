import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import * as _ from 'lodash';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { ToastService } from 'src/app/services/toast.service';
import { ListDatabaseComponent } from '../../database/list-database/list-database.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  projects: Project[];
  databases: Array<any>;
  toastService: any;
  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal,
    private toast: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProjects().subscribe(res => {
      if (res) {
        const data = _.map(res.projects, item => {
          return {
            id: item.id,
            name: item.name,
            created_at: item.created_at,
            updated_at: item.updated_at
          };
        });
        this.projects = data;
      }
    }, err => {
      if (err.status === 400) {
        return;
      } else {
        this.toast.showErrorMessage(err.error.message);
      }
    });
  }

  deleteProject(value) {
    const modalRef = this.modalService.open(DeleteProjectComponent);
    modalRef.componentInstance.name = value.name;

    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.projectService.deleteProject(value).subscribe(res => {
          this.getProject();
          this.toast.showSuccessMessage(result.message);
        });
      }
    }).catch((error) => {
      this.toast.showErrorMessage(error.message);
    });
  }

  createProject() {
    const modalRef = this.modalService.open(CreateProjectComponent);

    modalRef.result.then((result) => {
      if (result && result.message === 'Created successfully') {
        this.getProject();
        this.toast.showSuccessMessage(result.message);
      }
    }).catch((error) => {
      console.log(error);
      this.toast.showErrorMessage(error.message);
    });
  }

  viewProjectDetails(id, name) {
    this.router.navigate(['/list-database'], { queryParams: { projectId: id, projectName: name } });
  }

}
