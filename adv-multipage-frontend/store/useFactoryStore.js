import create from 'zustand'

const useFactoryStore = create((set) => ({
  factoryContract: null,
  setFactoryContract: (factoryContract) => set({ factoryContract })
}))

export default useFactoryStore