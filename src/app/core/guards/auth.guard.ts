import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../services/auth.services';
import { inject } from '@angular/core';
import { API_ENDPOINTS } from '../../shared/common/api_endpoints';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate([API_ENDPOINTS.AUTH.LOGIN], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
  return true;
};
