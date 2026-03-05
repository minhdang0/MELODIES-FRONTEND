import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MESSAGES } from '../../shared/common/messages';
import { DialogService } from '../services/dialog.service';

export const errorNotificationInterceptor: HttpInterceptorFn = (req, next) => {
  const dialogService = inject(DialogService);

  return next(req).pipe(
    catchError((err) => {
      // message is later replaced based on status; declare as string to avoid
      // the literal-type narrowing that comes from the `as const` definition
      let message: string = MESSAGES.ERROR.DEFAULT;

      if (err.status === 0) {
        message = MESSAGES.ERROR.NETWORK;
      } else if (err.status === 401) {
        // 401 thường được refresh interceptor xử lý → có thể bỏ qua hoặc thông báo nhẹ
        // message = MESSAGES.AUTH.TOKEN_EXPIRED;
      } else if (err.status === 403) {
        message = MESSAGES.ERROR.FORBIDDEN;
      } else if (err.status >= 400 && err.status < 500) {
        message = err.error?.message || err.error?.error || MESSAGES.ERROR.VALIDATION;
      } else if (err.status >= 500) {
        message = MESSAGES.ERROR.SERVER;
      }

      // log full error object for debugging
      console.error('HTTP error intercepted', err);
      // Không hiện dialog cho một số endpoint đặc biệt
      if (!req.url.includes('/refresh-token') && !req.url.includes('/login')) {
        // use the new error helper which also logs
        dialogService.error(message);
      }

      return throwError(() => err);
    }),
  );
};
