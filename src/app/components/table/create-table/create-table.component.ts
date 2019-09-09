import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/Table';
import { ToastService } from 'src/app/services/toast.service';
import { TableService } from 'src/app/services/table.service';
import * as _ from 'lodash';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { datatype } from '../../../constants/Datatype';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  @Input() databaseId;
  primaryKey: boolean;
  loading = false;
  submitted = false;
  form: FormGroup;
  model;
  notNull = [];
  unique = [];
  autoIncrement = [];
  types: Array<string>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private tableService: TableService,
    public modal: NgbActiveModal) {
  }

  items: any[] = [
    'Int', 'varchar', 'DATE', 'float', 'json'
  ];

  ngOnInit() {
    this.types = datatype;
    this.form = this.formBuilder.group({
      tableName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      column: this.formBuilder.array([this.addFields()])
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.form.valid) {
      const column = {};
      _.map(this.form.value.column, (item, index) => {
        column[item.name] = {
          type: `'${item.type}'`,
          primaryKey: parseInt(item.primaryKey, 0) === index ? true : undefined,
          unique: item.unique ? true : false,
          notNull: item.notNull ? true : false,
          autoIncrement: item.autoIncrement ? true : false
        };
      });
      const columnDetails = [column];
      this.loading = false;
      const tablePayload = {
        database_id: this.databaseId,
        schema: columnDetails,
        name: this.form.value.tableName
      };
      this.tableService.createTable(tablePayload).subscribe(res => {
        if (res) {
          this.modal.close(res);
        }
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
      primaryKey: '',
      unique: '',
      notNull: '',
      autoIncrement: ''
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

  getValidity(i) {
    return this.formArr.controls[i].invalid;
  }

  notNullChecked(i) {
    if (this.notNull[i]) {
      this.notNull[i] = !this.notNull[i];
    } else {
      this.notNull[i] = true;
    }
    this.form.value.column[i].notNull = this.notNull[i];
  }

  uniqueChecked(i) {
    if (this.unique[i]) {
      this.unique[i] = !this.unique[i];
    } else {
      this.unique[i] = true;
    }
    this.form.value.column[i].unique = this.unique[i];
  }

  autoIncrementChecked(i) {
    if (this.autoIncrement[i]) {
      this.autoIncrement[i] = !this.autoIncrement[i];
    } else {
      this.autoIncrement[i] = true;
    }
    this.form.value.column[i].autoIncrement = this.autoIncrement[i];
  }
}
