import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.css'],
})
export class InputCalendarComponent {
  @Input() set date(value: Date) {
    this._date = new Date(value);
    this.selectedDateString = this._date.toLocaleDateString();
    this.initDate();
  }

  get date(): Date {
    return this._date;
  }
  @Output() dateChange = new EventEmitter<Date>();

  private _date = new Date();

  selectedDateString = this.date.toLocaleDateString();
  showCalendar = false;
  disabled = false;
  public year = 2022;
  public day = 1;
  public month = 1;

  constructor(private modal: NgbModal) {}

  initDate() {
    const date = this.date;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
  }

  openCalendar(component: any) {
    this.modal.open(component);
  }

  setSelectedDate(date: Date) {
    this.date = date;
    this.year = this.date.getFullYear();
    this.day = this.date.getDate();
    this.month = this.date.getMonth();
    this.selectedDateString = this.date.toLocaleDateString();
    this.showCalendar = false;
    this.dateChange.emit(this.date);
    this.modal.dismissAll();
  }
}
