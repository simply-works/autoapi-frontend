import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.css']
})
export class DeleteTableComponent implements OnInit {
  @Input() name;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.close('Modal Closed');
  }
}
