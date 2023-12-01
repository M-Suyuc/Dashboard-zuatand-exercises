import { StateStorage, createJSONStorage } from 'zustand/middleware'

const sessionAPI: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    // throw new Error('Function not implemented.')
    console.log('getItem', name)
    const data = sessionStorage.getItem(name)
    return data
  },

  setItem: function (name: string, value: string): void | Promise<void> {
    // throw new Error('Function not implemented.')
    console.log('setItem', { name, value })
    sessionStorage.setItem(name, value)
  },

  removeItem: function (name: string): void | Promise<void> {
    // throw new Error('Function not implemented.')
    console.log('removeItem', name)
  }
}

export const customSessionStorage = createJSONStorage(() => sessionAPI)
