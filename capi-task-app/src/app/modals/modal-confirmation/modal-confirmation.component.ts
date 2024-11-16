import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
})
export class ModalConfirmationComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.activeModal.close('delete');
  }
}
