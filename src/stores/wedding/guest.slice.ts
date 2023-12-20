import { StateCreator } from 'zustand'

export interface GuestSlice {
  guestCount: number
  setGuestCount: (value: number) => void
}

export const createGuestSlice: StateCreator<GuestSlice> = (
  set
  // get,
  // storeAPI
) => ({
  guestCount: 0,
  setGuestCount: (guestCount: number) =>
    set({ guestCount: guestCount > 0 ? guestCount : 0 })
})
