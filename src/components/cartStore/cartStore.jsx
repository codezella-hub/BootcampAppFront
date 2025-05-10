import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (course) => {
        const existing = get().cartItems.find(item => item._id === course._id);
        if (existing) {
          set((state) => ({
            cartItems: state.cartItems.map(item =>
              item._id === course._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...course, quantity: 1 }]
          }));
        }
      },

      removeFromCart: (courseId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item._id !== courseId)
        }));
      },

      updateItemQuantity: (courseId, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item._id === courseId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      setCartFromBackend: (items) => {
        set({ cartItems: items });
      }
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
