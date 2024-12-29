import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getCreatedGroupsForUser(email: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${apiUrl}/` + email + `/createdgroups`);
  }

  getMemberGroupsForUser(email: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${apiUrl}/` + email + `/membergroups`);
  }

  getGroupsByName(name: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${apiUrl}/groups/` + name);
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.http.get<Group>(`${apiUrl}/group/` + groupId);
  }

  createGroup(name: string, user: SocialUser): Observable<Group> {
    return this.http.post<Group>(`${apiUrl}/group`, {
      name: name,
      createdBy: user.email,
    });
  }

  deleteGroup(groupId: string): Observable<Group> {
    return this.http.delete<Group>(`${apiUrl}/group/${groupId}`);
  }

  addUser(groupId: string, userEmail: string): Observable<Group> {
    return this.http.put<Group>(
      `${apiUrl}/group/adduser/` + groupId + `/` + userEmail,
      null
    );
  }

  removeUser(groupId: string, userEmail: string): Observable<Group> {
    return this.http.put<Group>(
      `${apiUrl}/group/removeuser/` + groupId + `/` + userEmail,
      null
    );
  }
}
