import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (!user) this.router.navigate(['/login']);
    });
  }
}
