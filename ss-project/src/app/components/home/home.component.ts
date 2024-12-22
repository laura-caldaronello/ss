import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user!: SocialUser;
  loggedIn!: boolean;

  constructor(private authService: SocialAuthService, private router: Router) {}

  ngOnInit() {
    const sessionUser = JSON.parse(sessionStorage.getItem('user') as string);
    if (!this.user && sessionUser) {
      this.user = sessionUser;
      this.loggedIn = sessionUser != null;
      if (this.loggedIn) {
        sessionStorage.setItem('user', JSON.stringify(sessionUser));
        this.router.navigate(['/user/overview']);
      }
    } else {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        if (this.loggedIn) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/user/overview']);
        }
      });
    }
  }
}
