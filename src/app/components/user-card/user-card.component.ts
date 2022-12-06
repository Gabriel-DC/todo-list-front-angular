import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  public user: any = {
    name: '',
    picture: 'https://via.placeholder.com/150',
  };

  ngOnInit(): void {
    this.afAuth.user.subscribe((data) => {
      if (data) {
        this.user.name = data.displayName;
        this.user.picture = data.photoURL;
      }
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}
