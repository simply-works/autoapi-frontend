import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDatabaseComponent } from '../delete-database/delete-database.component';
import { CreateDatabaseComponent } from '../create-database/create-database.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-database',
  templateUrl: './list-database.component.html',
  styleUrls: ['./list-database.component.css']
})
export class ListDatabaseComponent implements OnInit {
  databases: Array<any>;
  projectId: number;
  projectName: string;
  constructor(
    private databaseService: DatabaseService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {

        this.projectId = params.projectId;
        this.projectName = params.projectName;
        this.getDatabases();
      });
  }

  getDatabases() {
    this.databaseService.getDatabases(this.projectId).subscribe(res => {
      if (res) {
        this.databases = res.databases;
      }
    }, err => {
      if (err.status === 400) {
        return;
      } else {
        this.toastService.showErrorMessage(err.message);
      }
    });
  }

  deleteDatabase(value) {
    const modalRef = this.modalService.open(DeleteDatabaseComponent);
    modalRef.componentInstance.name = value.name;

    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.databaseService.deleteDatabase(value).subscribe(res => {
          this.getDatabases();
          this.toastService.showSuccessMessage(result.message);
        }, err => {
            this.toastService.showErrorMessage(err.message);
        });
      }
    }).catch((error) => {
      this.toastService.showErrorMessage(error.message);
    });
  }

  createDatabase() {
    const modalRef = this.modalService.open(CreateDatabaseComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.result.then((result) => {
    console.log("TCL: ListDatabaseComponent -> createDatabase -> result", result)
      if (result && result.message === 'Created successfully') {
        this.getDatabases();
      }
    }).catch((error) => {
    console.log("TCL: ListDatabaseComponent -> createDatabase -> error", error)
      this.toastService.showErrorMessage(error.message);
    });
  }

  viewDatabaseDetails(id, name) {
    this.router.navigate(['list-table'], { queryParams: { databaseId: id, databaseName: name, projectId: this.projectId } });
  }

}
