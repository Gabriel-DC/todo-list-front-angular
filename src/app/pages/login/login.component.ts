import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) this.router.navigate(['/']);
    });
  }

  login() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((data) => {
        if (data.user !== null) this.router.navigate(['/']);
      })
      .catch((err) => console.log(err));
  }
}
