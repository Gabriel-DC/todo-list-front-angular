import { firstValueFrom } from 'rxjs';
import { AfterViewInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getIdToken } from 'firebase/auth';

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
    let user = await firstValueFrom(this.afAuth.user);
    this.user.name = user?.displayName;
    this.user.picture = user?.photoURL;
  }

  public user: any = {
    name: '',
    picture: 'https://via.placeholder.com/150',
  };

  logout() {
    this.afAuth.signOut();
  }
}
