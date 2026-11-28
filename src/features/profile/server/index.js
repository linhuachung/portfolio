// Server-only entry point. Never import this from client components.
export { getAdminProfile, getPublicProfile, updateAdminProfile } from './profile-service';
export { formatUserData, normalizeOptionalField, normalizeStats } from './user-formatter';
