import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (course) => {
        const existing = get().cartItems.find(item => item._id === course._id)
        if (!existing) {
          set((state) => ({
            cartItems: [...state.cartItems, course]
          }))
        }
      },

      removeFromCart: (courseId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item._id !== courseId)
        }))
      },

      clearCart: () => {
        set({ cartItems: [] })
      }
    }),
    {
      name: 'cart-storage', 
    }
  )
)
