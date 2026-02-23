import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CONSTANTS } from '../../shared/common/contants';
import { API_ENDPOINTS } from '../../shared/common/api_endpoints';
import { ApiResponse, LoginData, RefreshTokenResponse } from '../../shared/models/response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUser = signal<User | null>(null);
  private isAuthentication = signal<boolean>(false);

  user = computed(() => this.currentUser());
  isLogined = computed(() => this.isAuthentication());

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.loadInfomationInit();
  }

  loadInfomationInit(): void {
    const user = this.getUser();
    if (user) {
      this.currentUser.set(user);
      this.userSubject.next(user);
      this.isAuthentication.set(true);
    }
  }

  setToken(token: string): void {
    localStorage.setItem(CONSTANTS.KEY.ACCESS_TOKEN, token);
  }

  setRefreshToken(refresh_token: string): void {
    localStorage.setItem(CONSTANTS.KEY.REFRESH_TOKEN, refresh_token);
  }

  setUser(user: User): void {
    localStorage.setItem(CONSTANTS.KEY.USER_INFO, JSON.stringify(user));
  }

  removeDataInLocalStorage(): void {
    localStorage.removeItem(CONSTANTS.KEY.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANTS.KEY.REFRESH_TOKEN);
    localStorage.removeItem(CONSTANTS.KEY.USER_INFO);
  }

  getToken = () => localStorage.getItem(CONSTANTS.KEY.ACCESS_TOKEN);
  getRefreshToken = () => localStorage.getItem(CONSTANTS.KEY.REFRESH_TOKEN);

  getUser = () => {
    const data = localStorage.getItem(CONSTANTS.KEY.USER_INFO);
    return data ? JSON.parse(data) : null;
  };

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }

  login(credentials: { email: string; password: string }): Observable<void> {
    return this.http.post<ApiResponse<LoginData>>(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap((response) => {
        if (response.response_data) {
          const { access_token, refresh_token, user } = response.response_data;
          if (access_token) this.setToken(access_token);
          if (refresh_token) this.setRefreshToken(refresh_token);
          if (user) {
            this.setUser(user);
            this.currentUser.set(user);
            this.userSubject.next(user);
            this.isAuthentication.set(true);
          }
          this.router.navigate([CONSTANTS.PATH.DASHBOARD]);
        }
      }),
      map(() => void 0),
      catchError((err) => {
        console.error('Login failed', err);
        return throwError(() => err);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {}).pipe(
      tap(() => {
        this.removeDataInLocalStorage();
        this.currentUser.set(null);
        this.isAuthentication.set(false);
        this.userSubject.next(null);
        this.router.navigate([CONSTANTS.PATH.LOGIN]);
      }),
    );
  }

  refreshToken(): Observable<string> {
    const refresh = this.getRefreshToken();

    if (!refresh) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<ApiResponse<RefreshTokenResponse>>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refresh_token: refresh,
      })
      .pipe(
        map((res) => {
          const token = res.response_data?.access_token;
          if (!token) {
            throw new Error('No access token received from refresh endpoint');
          }
          this.setToken(token);
          return token;
        }),
      );
  }
}
