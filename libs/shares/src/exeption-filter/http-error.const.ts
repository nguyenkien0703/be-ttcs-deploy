export const httpErrors = {
    COMMON: {
        message: 'Unknown error',
        code: 'COMMON_00000',
    },
    UNAUTHORIZED: {
        code: 'AUTH_00000',
        message: 'Unauthorized',
    },
    USER_NOT_FOUND: {
        message: 'User not found. Please try again',
        code: 'USER_00001',
    },
    USER_INVALID_PASSWORD: {
        message: 'Password of user invalid credentials. Please try again',
        code: 'USER_00002',
    },
    USER_EXISTED: {
        message: 'Password of user invalid credentials. Please try again',
        code: 'USER_00003',
    },
    // latop
    LAPTOP_NOT_FOUND: {
        message: 'laptop not found. Please try again',
        code: 'LAPTOP_00001',
    },
    //comment
    COMMENT_NOT_FOUND: {
        message: 'comment not found. Please try again',
        code: 'COMMENT_00001',
    },

    //token reset password
    RESET_PASSWORD_TOKEN_IS_STILL_VALID: {
        message: 'Reset password token is still valid. Please try again',
        code: 'RESET_PASSWORD_TOKEN_00000',
    },
    RESET_PASSWORD_TOKEN_SEND_FAILED: {
        message: 'Reset password token has send failed. Please try again',
        code: 'RESET_PASSWORD_TOKEN_00001',
    },
    RESET_PASSWORD_TOKEN_EXPIRED: {
        message: 'Reset password token has expired. Please try again',
        code: 'RESET_PASSWORD_TOKEN_00002',
    },
}
