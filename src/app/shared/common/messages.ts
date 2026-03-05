export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công!',
    LOGOUT: 'Đăng xuất thành công.',
    CREATE: 'Tạo mới thành công!',
    UPDATE: 'Cập nhật thành công!',
    DELETE: 'Xóa thành công!',
    SAVE: 'Lưu thành công!',
    SEND: 'Gửi thành công!',
    IMPORT: 'Nhập dữ liệu thành công!',
    EXPORT: 'Xuất dữ liệu thành công!',
    PASSWORD_CHANGED: 'Đổi mật khẩu thành công!',
    PROFILE_UPDATED: 'Cập nhật thông tin cá nhân thành công!',
  },

  ERROR: {
    DEFAULT: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
    NETWORK: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
    TIMEOUT: 'Yêu cầu hết thời gian. Vui lòng thử lại.',
    SERVER: 'Máy chủ đang gặp sự cố. Vui lòng liên hệ quản trị viên.',
    UNAUTHORIZED: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
    FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này.',
    NOT_FOUND: 'Không tìm thấy dữ liệu yêu cầu.',
    VALIDATION: 'Vui lòng kiểm tra lại thông tin nhập vào.',
    FILE_TOO_LARGE: 'File quá lớn. Kích thước tối đa cho phép là {size}MB.',
    INVALID_FORMAT: 'Định dạng file không hợp lệ.',
  },

  CONFIRM: {
    DELETE: (itemName: string = 'mục này') => `Bạn có chắc chắn muốn xóa ${itemName}?`,
    DELETE_MULTIPLE: (count: number) => `Bạn có chắc chắn muốn xóa ${count} mục đã chọn?`,
    LOGOUT: 'Bạn có chắc chắn muốn đăng xuất?',
    DISCARD_CHANGES: 'Bạn có thay đổi chưa lưu. Bạn có muốn hủy bỏ không?',
    RESET_PASSWORD: 'Bạn có chắc muốn đặt lại mật khẩu?',
  },

  WARNING: {
    UNSAVED_CHANGES: 'Có thay đổi chưa được lưu. Tiếp tục sẽ mất dữ liệu này.',
    SESSION_EXPIRING: 'Phiên làm việc sắp hết hạn. Vui lòng lưu công việc.',
  },

  BUTTON: {
    OK: 'Đồng ý',
    CANCEL: 'Hủy',
    CLOSE: 'Đóng',
    SAVE: 'Lưu',
    UPDATE: 'Cập nhật',
    DELETE: 'Xóa',
    ADD: 'Thêm',
    EDIT: 'Sửa',
    VIEW: 'Xem',
    SEARCH: 'Tìm kiếm',
    RESET: 'Đặt lại',
    CONFIRM: 'Xác nhận',
    LOGIN: 'Đăng nhập',
    LOGOUT: 'Đăng xuất',
  },

  VALIDATION: {
    REQUIRED: 'Trường này không được để trống.',
    EMAIL_INVALID: 'Email không hợp lệ.',
    PHONE_INVALID: 'Số điện thoại không hợp lệ.',
    MIN_LENGTH: (min: number) => `Độ dài tối thiểu là ${min} ký tự.`,
    MAX_LENGTH: (max: number) => `Độ dài tối đa là ${max} ký tự.`,
    PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp.',
  },

  AUTH: {
    LOGIN_FAILED: 'Email hoặc mật khẩu không đúng.',
    ACCOUNT_LOCKED: 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.',
    TOKEN_EXPIRED: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
    REFRESH_TOKEN_FAILED: 'Không thể làm mới phiên. Vui lòng đăng nhập lại.',
  },

  INFO: {
    NO_DATA: 'Không có dữ liệu để hiển thị.',
    NO_RESULT: 'Không tìm thấy kết quả phù hợp.',
    LOADING: 'Đang tải dữ liệu...',
  },
} as const;
