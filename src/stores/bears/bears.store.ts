import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Bear {
  id: number
  name: string
}

interface BearState {
  blackBears: number
  polarBears: number
  pandaBears: number
  bears: Bear[]
  increaseBlackBears: (by: number) => void
  increasePandaBears: (by: number) => void
  increasePolarBears: (by: number) => void
  doNothing: () => void
  addBear: () => void
  clearBear: () => void
  // computed: {
  //   totalBears: number
  // }
  totalBears: () => number
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,
      bears: [{ id: 1, name: 'oso #1' }],

      // computed: {
      //   get totalBears(): number {
      //     return (
      //       get().blackBears +
      //       get().pandaBears +
      //       get().polarBears +
      //       get().bears.length
      //     )
      //   }
      // },

      totalBears(): number {
        return (
          get().blackBears +
          get().pandaBears +
          get().polarBears +
          get().bears.length
        )
      },

      increaseBlackBears: (by: number) =>
        set((state) => ({ blackBears: state.blackBears + by })),

      increasePandaBears: (by: number) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),

      increasePolarBears: (by: number) =>
        set((state) => ({ polarBears: state.polarBears + by })),

      doNothing: () => set((state) => ({ bears: [...state.bears] })),

      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `oso #${state.bears.length + 1}`
            }
          ]
        })),

      clearBear: () => set({ bears: [] })
    }),
    { name: 'bears-store' }
  )
)
