import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { forbiddenArrayValidator } from 'src/app/validators/forbiddenArrayValidator';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  user!: SocialUser;
  groupId!: string;
  groupName!: string;
  createdBy!: string;
  members: User[] = [];
  readonly dialog = inject(MatDialog);
  sorting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: SocialAuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const sessionUser = JSON.parse(sessionStorage.getItem('user') as string);
    if (!this.user && sessionUser) {
      this.user = sessionUser;
      this.getGroup();
    } else {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.getGroup();
      });
    }
  }

  getGroup() {
    this.groupId = this.route.snapshot.params['groupId'];
    this.groupService.getGroupById(this.groupId).subscribe((group: Group) => {
      console.log('groupFound', group);
      this.groupId = group.id;
      this.createdBy = group.createdBy;
      this.groupName = group.name;
      [this.createdBy, ...group.users].forEach((member) => {
        this.userService.getUser(member).subscribe((user) => {
          this.members.push({
            email: user?.email || member,
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
          });
        });
      });
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'nome del malcapitato',
        validators: [
          Validators.email,
          forbiddenArrayValidator(this.members.map((m) => m.email)),
        ],
      },
    });

    dialogRef.afterClosed().subscribe((userEmail) => {
      if (userEmail !== undefined && userEmail !== '') {
        this.groupService
          .addUser(this.groupId, userEmail)
          .subscribe((group: Group) => {
            console.log('edited group', group);
            this.members = [];
            this.getGroup();
          });
      }
    });
  }

  removeUser(userEmail: string) {
    this.groupService
      .removeUser(this.groupId, userEmail)
      .subscribe((group: Group) => {
        console.log('edited group', group);
        this.groupId = group.id;
        const toRemove = this.members.find(
          (member) => member.email == userEmail
        )!;
        this.members = this.members.splice(this.members.indexOf(toRemove), 1);
      });
  }

  sort() {
    this.sorting = true;

    let currentIndex = this.members.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.members[currentIndex], this.members[randomIndex]] = [
        this.members[randomIndex],
        this.members[currentIndex],
      ];
    }

    console.log(this.members);
  }

  confirmSorting() {}
}
