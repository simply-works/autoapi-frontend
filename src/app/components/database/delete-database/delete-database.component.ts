import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-database',
  templateUrl: './delete-database.component.html',
  styleUrls: ['./delete-database.component.css']
})
export class DeleteDatabaseComponent implements OnInit {
  @Input() name;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.close('Modal Closed');
  }
}
