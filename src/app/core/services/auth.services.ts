import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from 'express';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { CONSTANTS } from '../../shared/common/contants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUser = signal<User | null>(null); // create reactive to see this variable is changed and UI is updated
  private isAuthentication = signal<boolean | null>(false);

  user = computed(() => this.currentUser);
  isLogged = computed(() => this.isAuthentication);
  private userSubject = new BehaviorSubject<User | null>(null); // keep this value when It is changed and component use subscribe to get value
  user$ = this.userSubject.asObservable(); // give other component listen value but not change value

  constructor() {
    this.loadInformationInit();
  }

  loadInformationInit(): void {
    const user = this.getUser();
    if (user) {
      this.currentUser.set(user);
      this.userSubject.next(user);
      this.isAuthentication.set(true);
    }
  }
  setUser(user: User): void {
    localStorage.setItem(CONSTANTS.KEY.USER_INFO, JSON.stringify(user));
  }
  getUser() {
    const user = localStorage.getItem(CONSTANTS.KEY.USER_INFO);
    return user ? JSON.parse(user) : null;
  }
}
