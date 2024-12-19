import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user!: SocialUser;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  goBack() {
    this.location.back(); // Go back to the previous page
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }
}
