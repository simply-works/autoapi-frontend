import { Component, OnInit, Input } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ToastService } from 'src/app/services/toast.service';
import * as _ from 'lodash';
import { Table } from 'src/app/models/Table';
import { DeleteTableComponent } from '../delete-table/delete-table.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTableComponent } from '../create-table/create-table.component';
import { ViewTableDetailsComponent } from '../view-table-details/view-table-details.component';
import { EditTableComponent } from '../edit-table/edit-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {

  tables: Array<any>;
  databaseId: number;
  projectName: string;
  databaseName: string;
  projectId: number;
  constructor(
    private tableService: TableService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.projectId = params.projectId;
        this.databaseId = params.databaseId;
        this.databaseName = params.databaseName;
        this.getProjectDetails();
        this.getTables();
      });
  }

  getTables() {
    this.tableService.getTables(this.databaseId).subscribe(res => {
      if (res) {
        this.tables = res.tables;
      }
    }, err => {
      if (err.status === 400) {
        return;
      } else {
        this.toastService.showErrorMessage(err.message);
      }
    });
  }

  deleteTables(value) {
    const modalRef = this.modalService.open(DeleteTableComponent);
    modalRef.componentInstance.name = value.name;

    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.tableService.deleteTable(value).subscribe(res => {
          this.getTables();
          this.toastService.showSuccessMessage('Deleted Successfully');
        }, err => {
          console.log(err);
          this.getTables();
          this.toastService.showErrorMessage(err.message);
        });
      }
    }).catch((error) => {
      this.toastService.showErrorMessage(error.message);
    });
  }

  createTable() {
    const modalRef = this.modalService.open(CreateTableComponent, { size: 'lg' });
    modalRef.componentInstance.databaseId = this.databaseId;
    modalRef.result.then((result) => {
      if (result && result.message === 'Created successfully') {
        this.getTables();
        this.toastService.showSuccessMessage('Created Successfully');
      }
    }).catch((error) => {
      this.toastService.showErrorMessage(error.message);
    });
  }

  viewTableDetails(tableDetails) {
    const modalRef = this.modalService.open(ViewTableDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.tableDetails = tableDetails;
  }

  editTables(tableDetails) {
    const modalRef = this.modalService.open(EditTableComponent);
    modalRef.componentInstance.tableDetails = tableDetails;
    modalRef.result.then((result) => {
      this.toastService.showSuccessMessage('updated Successfully');
      this.getTables();
    }).catch((error) => {
      console.log(error);
    });
  }

  getProjectDetails() {
    this.projectService.getProjectsById(this.projectId).subscribe((res) => {
      this.projectName = res.project[0].name;
    });
  }
}
