import { RootState } from '../../store';

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileComments = (state: RootState) => state.profile.profile?.comments
export const selectProfileDelivery = (state: RootState) => state.profile.profile?.delivery
export const selectProfileBookingId = (state: RootState) => state.profile.profile?.booking.id

