const BASE_URL = process.env.REACT_APP_BASE_URL;

// auth endpoints
export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL  + "/auth/signup",
    LOGIN_API : BASE_URL    +"/auth/login",
    RESET_PASS_TOKEN : BASE_URL + "/auth/reset-pass-token",
    RESET_PASS_API : BASE_URL + "/auth/reset-pass",
}

// profile API
export const profileEndpoints = {
    UPDATE_PROFILE_API : BASE_URL + "/profile/update-profile",
    UPDATE_PROFILE_IMG : BASE_URL + "/profile/update-prfileImage",
    GETALL_DEVLOPERS : BASE_URL + "/profile/getAll-developers",
    CREATE_BUG : BASE_URL + "/bug/createBug",
    UPDATE_BUG : BASE_URL + "/bug/updateById",
}