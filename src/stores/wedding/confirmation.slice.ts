import { StateCreator } from 'zustand'

export interface ConfirmationSlice {
  confirmation: boolean | undefined
  setConfirmation: (consifrmation: boolean) => void
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
  set
) => ({
  confirmation: false,
  setConfirmation: (confirmation: boolean) =>
    set({ confirmation: confirmation ? confirmation : false })
})
