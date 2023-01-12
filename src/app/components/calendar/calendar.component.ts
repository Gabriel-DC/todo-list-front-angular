import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDay } from 'src/app/models/calendarDays';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<Date>();
  @Input() set day(value: number) {
    this._day = value;
  }
  get day() {
    return this._day;
  }

  @Input() set month(value: number) {
    this._month = value;
  }
  get month(): number {
    return this._month;
  }

  @Input() set year(value: number) {
    this._year = value;
  }
  get year(): number {
    return this._year;
  }

  private _day = 1;
  private _month = 1;
  private _year = 2022;

  public currentMonth = 'January';
  public days: CalendarDay[] = [];
  public selectedDate: Date = new Date();
  public loading = false;

  public months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  ngOnInit(): void {
    this.loading = true;
    this.initDate();
    this.generateCalendar();
  }

  initDate() {
    this.selectedDate = new Date(this.year, this.month, this.day);
    this.currentMonth = this.months[this.month];
  }

  selectDate(day: CalendarDay) {
    if (day.date) {
      this.selectedDate = new Date(
        this.year,
        this.months.indexOf(this.currentMonth),
        day.date
      );
      this.dateSelected.emit(this.selectedDate);
    }
  }

  previousMonth() {
    const currentIndex = this.months.indexOf(this.currentMonth);
    if (currentIndex === 0) {
      this.currentMonth = this.months[this.months.length - 1];
      this.year -= 1;
    } else {
      this.currentMonth = this.months[currentIndex - 1];
    }
    this.generateCalendar();
  }

  nextMonth() {
    const currentIndex = this.months.indexOf(this.currentMonth);
    if (currentIndex === this.months.length - 1) {
      this.currentMonth = this.months[0];
      this.year += 1;
    } else {
      this.currentMonth = this.months[currentIndex + 1];
    }
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];
    const daysInCurrentMonth = new Date(
      this.year,
      this.months.indexOf(this.currentMonth) + 1,
      0
    ).getDate();
    const firstDayOfWeek = new Date(
      this.year,
      this.months.indexOf(this.currentMonth),
      1
    ).getDay();

    const lastDayOfMonth = new Date(
      this.year,
      this.months.indexOf(this.currentMonth) + 1,
      0
    ).getDay();

    console.log(daysInCurrentMonth);

    for (let i = 0; i < firstDayOfWeek; i++) {
      this.days.push({});
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      this.days.push({
        date: i,
      });
    }

    for (let i = 7; i > lastDayOfMonth; i--) {
      console.log(lastDayOfMonth);
      console.log(i);
      this.days.push({});
    }

    this.loading = false;
  }
}
