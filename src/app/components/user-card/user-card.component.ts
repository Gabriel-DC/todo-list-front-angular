import { AfterViewInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements AfterViewInit {
  constructor(private afAuth: AngularFireAuth) {}
  ngAfterViewInit(): void {
    this.afAuth.user.subscribe((data) => {
      if (data) {
        this.user.name = data.displayName;
        this.user.picture = data.photoURL;
      }
    });
  }

  public user: any = {
    name: '',
    picture: 'https://via.placeholder.com/150',
  };

  logout() {
    this.afAuth.signOut();
  }
}
