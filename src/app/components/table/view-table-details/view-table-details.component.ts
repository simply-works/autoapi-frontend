import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-table-details',
  templateUrl: './view-table-details.component.html',
  styleUrls: ['./view-table-details.component.css']
})
export class ViewTableDetailsComponent implements OnInit {

  @Input() tableDetails;
  tableData: [];
  schema;
  objectKeys = Object.keys;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    this.schema = this.tableDetails.schema[0];
    const name = Object.keys(this.schema);
    this.tableData = _.map(name, item => {
      if (item === 'created_at' || item === 'updated_at') {
        return;
      }
      return {
        name: item,
        type: this.schema[item].type,
        primaryKey: this.schema[item].primaryKey
      };
    });
    this.tableData = _.compact(this.tableData);
  }

  closeModal() {
    this.modal.close('Modal Closed');
  }
}
