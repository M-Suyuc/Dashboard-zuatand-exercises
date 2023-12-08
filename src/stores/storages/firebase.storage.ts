import { StateStorage, createJSONStorage } from 'zustand/middleware'

const firebaseUrl =
  'https://zustan-storage-m-default-rtdb.firebaseio.com/zustand'

const sessionAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      )
      // console.log(data)
      return JSON.stringify(data)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then((res) => res.json())
    // console.log(data)
  },

  removeItem: function (name: string): void | Promise<void> {
    // throw new Error('Function not implemented.')
    // console.log('removeItem', name)
  }
}

export const firebaseStorage = createJSONStorage(() => sessionAPI)
