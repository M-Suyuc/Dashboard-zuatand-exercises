import { StateCreator } from 'zustand'

export interface DateSlice {
  date: string
  setDate: (lastName: string) => void
  hour: string
  setHour: (lastName: string) => void
}

export const createDateSlice: StateCreator<DateSlice> = (set) => ({
  date: '',
  setDate: (date: string) => (
    console.log(typeof date), set({ date: date ? date : '' })
  ),
  hour: '',
  setHour: (hour: string) => set({ hour: hour ? hour : '' })
})
