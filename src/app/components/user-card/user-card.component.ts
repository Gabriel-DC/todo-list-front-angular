import { firstValueFrom } from 'rxjs';
import { AfterViewInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getIdToken } from 'firebase/auth';
import { User } from 'src/app/models/user';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements AfterViewInit {
  constructor(private afAuth: AngularFireAuth) {}
  ngAfterViewInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    const { displayName, photoURL, email } =
      (await firstValueFrom(this.afAuth.user)) || {};
    this.user = {
      name: displayName?.toString(),
      picture: photoURL?.toString() ?? 'https://via.placeholder.com/150',
      email: email?.toString(),
    };
  }

  public user: User = {
    name: '',
    picture: 'https://via.placeholder.com/150',
    email: '',
  };

  logout() {
    this.afAuth.signOut();
  }
}
