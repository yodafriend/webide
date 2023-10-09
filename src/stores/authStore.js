import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
