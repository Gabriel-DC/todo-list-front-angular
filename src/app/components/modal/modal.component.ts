import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  public isOpen: boolean = false;
  public deleteEvent = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
