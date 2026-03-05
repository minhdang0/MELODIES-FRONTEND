import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import {
  CustomDialogComponent,
  DialogConfig,
} from '../../shared/components/custom-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialog = inject(MatDialog);

  private openDialog(config: DialogConfig): MatDialogRef<CustomDialogComponent> {
    // wrap in try/catch so that any failure opening the dialog is logged
    try {
      return this.dialog.open<CustomDialogComponent>(CustomDialogComponent, {
        data: config,
        width: '380px',
        maxWidth: '90vw',
        disableClose: config.type === 'confirm',
        autoFocus: true,
        panelClass: 'custom-dialog-panel',
      });
    } catch (err) {
      console.error('DialogService.openDialog error', err, config);
      throw err;
    }
  }

  notification(
    message: string,
    options: {
      title?: string;
      okText?: string;
      onOk?: () => void | Promise<void>;
      onClose?: () => void;
    } = {},
  ): MatDialogRef<CustomDialogComponent> {
    return this.openDialog({
      type: 'notification',
      message,
      title: options.title,
      okText: options.okText,
      onOk: options.onOk,
      onClose: options.onClose,
    });
  }

  confirm(
    message: string,
    options: {
      title?: string;
      okText?: string;
      cancelText?: string;
      onOk?: () => void | Promise<void>;
      onCancel?: () => void;
      onClose?: () => void;
    } = {},
  ): Observable<boolean> {
    const ref = this.openDialog({
      type: 'confirm',
      message,
      title: options.title,
      okText: options.okText,
      cancelText: options.cancelText,
      onOk: options.onOk,
      onCancel: options.onCancel,
      onClose: options.onClose,
    });

    return ref.afterClosed() as Observable<boolean>;
  }

  async confirmAsync(
    message: string,
    options: Parameters<DialogService['confirm']>[1] = {},
  ): Promise<boolean> {
    const ref = this.confirm(message, options);
    return new Promise<boolean>((resolve) => {
      ref.subscribe((result) => resolve(result ?? false));
    });
  }

  /**
   * Show an error dialog and write to console.error for diagnostics.
   * Useful for interceptors or catch blocks.
   */
  error(
    message: string,
    options: {
      title?: string;
      onClose?: () => void;
    } = {},
  ): MatDialogRef<CustomDialogComponent> {
    // always log the error to the console as well so we have a record
    console.error('DialogService.error:', message);
    return this.notification(message, {
      title: options.title ?? 'Lỗi',
      onClose: options.onClose,
    });
  }
}
