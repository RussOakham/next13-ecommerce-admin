import { create } from 'zustand'

interface UseStoreModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useStoreModal = create<UseStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useStoreModal
