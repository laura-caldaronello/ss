import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, inject, model, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { GroupService } from 'src/app/services/group.service';
import { Group } from '../../models/group.model';
import { User } from 'src/app/models/user.model';
import { catchError, combineLatest } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user!: SocialUser;
  loggedIn!: boolean;
  readonly dialog = inject(MatDialog);
  groups: Group[] = [];
  createdGroups: Group[] = [];
  memberGroups: Group[] = [];

  constructor(
    private userService: UserService,
    private authService: SocialAuthService,
    private router: Router,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    const sessionUser = JSON.parse(sessionStorage.getItem('user') as string);
    if (!this.user && sessionUser) {
      this.getUser(sessionUser);
    } else {
      this.authService.authState.subscribe((user) => {
        this.getUser(user);
      });
    }
  }

  getUser(user: SocialUser) {
    this.user = user;
    this.loggedIn = user != null;
    if (this.loggedIn) {
      this.userService.getUser(user.email).subscribe((savedUser: User) => {
        if (!savedUser) {
          this.userService.setUser(user).subscribe((createdUser: User) => {
            console.log('createdUser: ', createdUser);
            this.getGroups(createdUser);
          });
        } else {
          console.log('savedUser: ', savedUser);
          this.getGroups(savedUser);
        }
      });
    }
  }

  getGroups(user: User) {
    combineLatest([
      this.groupService.getCreatedGroupsForUser(user.email),
      this.groupService.getMemberGroupsForUser(user.email),
    ]).subscribe(([createdGroups, memberGroups]) => {
      this.createdGroups = createdGroups ? createdGroups : [];
      console.log('createdGroups', this.createdGroups);
      this.memberGroups = memberGroups ? memberGroups : [];
      console.log('memberGroups', this.memberGroups);
      this.groups = [...this.createdGroups, ...this.memberGroups];
    });
  }

  createGroup() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { type: 'input', title: 'nome del gruppo', validators: [] },
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name !== undefined && name !== '') {
        this.groupService
          .createGroup(name, this.user)
          .subscribe((createdGroup) => {
            console.log('createdGroup', createdGroup);
            this.getUser(this.user);
          });
      }
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.getUser(this.user);
    });
  }

  viewGroup(groupId: string) {
    this.router.navigate(['/user/group/' + groupId]);
  }
}
