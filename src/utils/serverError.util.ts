import { ObjectUtils } from "../refs";

export const ErrorMessage = {
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    ACCESS_DENIED: 'ACCESS_DENIED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    UNAUTHORZIED: 'UNAUTHORZIED',

    PASSWORD_INCORRECT: 'PASSWORD_INCORRECT',
    PASSWORD_MUST_BE_PROVIDED: 'Mật khẩu không được để trống.',
    CANNOT_GET_USER_PHONE_NUMBER_FROM_FIREBASE: 'Hệ thống không truy cập được dữ liệu từ đối tác. Hãy liên hệ ngay Baloo!',
    USER_NOT_VERIFIED: 'Bạn chưa xác thực số điện thoại.',

    STAFF_NOT_EXIST: 'STAFF_NOT_EXIST',
    STAFF_IS_DISABLED: 'STAFF_IS_DISABLED',

    CANNOT_FIND_ROLE: 'CANNOT_FIND_ROLE',
    CANNOT_FIND_USER: 'Tài khoản chưa đăng ký.',

    ROLE_WAS_EXISTED: 'ROLE_WAS_EXISTED',
    NAME_WAS_EXISTED: 'NAME_WAS_EXISTED',
    EMAIL_WAS_EXISTED: 'EMAIL_WAS_EXISTED',
    PHONE_NUMBER_WAS_EXISTED: 'Số điện thoại của bạn đã được sử dụng.',
    PHONE_NUMBER_MUST_BE_PROVIDED: 'Bạn cần cung cấp số điện thoại.',

    MUST_BE_NUMBER: 'MUST_BE_NUMBER',
    MUST_BE_STRING: 'MUST_BE_STRING',
    MUST_BE_OBJECT: 'MUST_BE_OBJECT',
    MUST_BE_ARRAY: 'MUST_BE_ARRAY',
    MUST_BE_PROVIDED: 'MUST_BE_PROVIDED',

    INVALID_PAYLOAD: 'INVALID_PAYLOAD',
    INVALID_ROUTE: 'INVALID_ROUTE',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
    INVALID_PERMISSION: 'INVALID_PERMISSION',
}

export class ServerError extends Error {
    status: number;
    errors: any;
    constructor(msg: string, status?: number, errors?: any) {
        super(msg);
        if (status) this.status = status;
        this.errors = errors || {};
    }
}

export function ThrowPayloadError(errors: any) {
    if (ObjectUtils.isHasValue(errors)) throw new ServerError(ErrorMessage.INVALID_PAYLOAD, 400, errors);
}