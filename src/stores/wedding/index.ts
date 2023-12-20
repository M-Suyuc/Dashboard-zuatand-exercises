import { create } from 'zustand'
import { PersonSlice, createPersonSlice } from './person.slice'
import { devtools, persist } from 'zustand/middleware'
import { GuestSlice, createGuestSlice } from './guest.slice'

type ShareState = PersonSlice & GuestSlice

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    persist(
      // (set,get,storeAPI)=>({}) es igual a (..a)=>({})
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a)
      }),
      { name: 'wedding-state' }
    )
  )
)
