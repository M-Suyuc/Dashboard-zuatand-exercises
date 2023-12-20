import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { PersonSlice, createPersonSlice } from './person.slice'
import { GuestSlice, createGuestSlice } from './guest.slice'
import { DateSlice, createDateSlice } from './date.slice'
import {
  ConfirmationSlice,
  createConfirmationSlice
} from './confirmation.slice'

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    persist(
      // (set,get,storeAPI)=>({}) es igual a (..a)=>({})
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlice(...a)
      }),
      { name: 'wedding-state' }
    )
  )
)
