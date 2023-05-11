import { url } from './api';

// AUTH_API
export const REGISTATION_API = `${url}auth/local/register`;
export const AUTHORIZATION_API = `${url}auth/local`;
export const FORGOT_PASSWORD_API = `${url}auth/forgot-password`;
export const RECOVERY_PASSWORD_API = `${url}auth/reset-password`;

// BOOKING_API
export const BOOKINGS_API = 'bookings';

// COMMENTS_API
export const COMMENTS_API = 'comments';

// BOOKS_API
export const BOOKS_API = 'books';
export const CATEGORIES_API = 'categories';

// PROFILE_API
export const PROFILE_API = 'users/me';
export const UPLOAD_AVATAR_API = 'upload';
export const CHANGE_PROFILE = 'users/';
