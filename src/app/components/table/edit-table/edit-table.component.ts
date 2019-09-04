import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { TableService } from 'src/app/services/table.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { datatype } from '../../../constants/Datatype';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  @Input() tableDetails;
  loading = false;
  submitted = false;
  form: FormGroup;
  schema: any;
  tableData: any;
  types: Array<string>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private tableService: TableService,
    public modal: NgbActiveModal) {
  }


  ngOnInit() {
    this.types = datatype;
    this.form = this.formBuilder.group({
      tableName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      column: this.formBuilder.array([this.addFields()])
    });

    this.schema = this.tableDetails.schema[0];
    const name = Object.keys(this.schema);
    this.tableData = _.map(name, item => {
      if (item === 'created_at' || item === 'updated_at') {
        return;
      }
      return {
        name: item,
        type: this.schema[item].type
      };
    });
    this.tableData = _.compact(this.tableData);
    this.form.get('tableName').setValue(this.tableDetails.name);
    this.form.patchValue(this.tableData);
    this.tableData.forEach(element => {
      this.formArr.push(this.formBuilder.group(element));
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.form.valid) {
      const column = {};
      _.map(this.form.value.column, item => {
        column[item.name] = {
          type: item.type
        };
      });
      const columnDetails = [column];
      this.loading = false;
      const tablePayload = {
        database_id: this.tableDetails.database_id,
        schema: columnDetails,
        name: this.form.value.tableName,
        id: this.tableDetails.id
      };
      this.tableService.updateTable(tablePayload).subscribe(res => {
        this.modal.close(res);
      }, err => {
        this.modal.close(err);
      });
      return;
    }
    this.loading = false;
  }

  addFields(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  get formArr() {
    return this.form.get('column') as FormArray;
  }
  addOnButtonClick(): void {
    this.formArr.push(this.addFields());
  }

  removeOnButtonClick(index): void {
    this.formArr.removeAt(index);
  }

  createTableDetails(item) {
    const tableDetails = {
      [item.name]: {
        type: item.type
      }
    };
    return tableDetails;
  }

}
