import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type DialogType = 'notification' | 'confirm';

export interface DialogConfig {
  type: DialogType;
  message: string;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onClose?: () => void;
}

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent {
  private dialogRef = inject(MatDialogRef<CustomDialogComponent>);
  private data = inject<DialogConfig>(MAT_DIALOG_DATA);

  get type() {
    return this.data.type;
  }
  get message() {
    return this.data.message;
  }
  get title() {
    return this.data.title ?? (this.type === 'confirm' ? 'Xác nhận' : 'Thông báo');
  }
  get okText() {
    return this.data.okText ?? 'Đồng ý';
  }
  get cancelText() {
    return this.data.cancelText ?? 'Hủy';
  }

  onOk() {
    if (this.data.onOk) {
      const result = this.data.onOk();
      if (result instanceof Promise) {
        result.finally(() => this.dialogRef.close(true));
      } else {
        this.dialogRef.close(true);
      }
    } else {
      this.dialogRef.close(true);
    }
  }

  onCancel() {
    if (this.data.onCancel) this.data.onCancel();
    this.dialogRef.close(false);
  }

  onClose() {
    if (this.data.onClose) this.data.onClose();
    this.dialogRef.close();
  }
}
