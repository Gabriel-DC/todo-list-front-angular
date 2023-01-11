import { Component } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent {
  constructor() {}

  public today = new Date(
    new Date().toLocaleDateString('en-US', {
      timeZone: 'America/Sao_Paulo',
    })
  )
    .toISOString()
    .split('T')[0];
}
