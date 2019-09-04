import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {
  @Input() name;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.close('Modal Closed');
  }

}
