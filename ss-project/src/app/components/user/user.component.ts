import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, inject, model, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { GroupService } from 'src/app/services/group.service';
import { Group } from '../../models/group.model';
import { User } from 'src/app/models/user.model';

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

  constructor(
    private userService: UserService,
    private authService: SocialAuthService,
    private router: Router,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    const sessionUser = JSON.parse(sessionStorage.getItem('user') as string);
    if (!this.user && sessionUser) {
      this.user = sessionUser;
      this.loggedIn = sessionUser != null;
      if (this.loggedIn) {
        this.userService
          .getUser(sessionUser.email)
          .subscribe((savedUser: User) => {
            if (!savedUser) {
              this.userService
                .setUser(sessionUser)
                .subscribe((createdUser: User) => {
                  console.log('createdUser: ', createdUser);
                });
            } else {
              console.log('savedUser: ', savedUser);
              this.groupService
                .getGroupsForUser(savedUser.email)
                .subscribe((groups: Group[]) => {
                  this.groups = groups;
                  console.log('groups', groups);
                });
            }
          });
      }
    } else {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        if (this.loggedIn) {
          this.userService.getUser(user.email).subscribe((savedUser: User) => {
            if (!savedUser) {
              this.userService.setUser(user).subscribe((createdUser: User) => {
                console.log('createdUser: ', createdUser);
              });
            } else {
              console.log('savedUser: ', savedUser);
              this.groupService
                .getGroupsForUser(savedUser.email)
                .subscribe((groups: Group[]) => {
                  this.groups = groups;
                  console.log('groups', groups);
                });
            }
          });
        }
      });
    }
  }

  createGroup() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { title: 'nome del gruppo' },
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name !== undefined && name !== '') {
        this.groupService
          .createGroup(name, this.user)
          .subscribe((createdGroup) => {
            console.log('createdGroup', createdGroup);
          });
      }
    });
  }

  addUser(groupId: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { title: 'nome del malcapitato' },
    });

    dialogRef.afterClosed().subscribe((userEmail) => {
      if (userEmail !== undefined && userEmail !== '') {
        this.groupService
          .addUser(groupId, userEmail)
          .subscribe((group: Group) => {
            console.log('edited group', group);
          });
      }
    });
  }

  viewGroup(groupId: string) {
    this.router.navigate(['/user/group/' + groupId]);
  }
}
