import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email') || '',
  csrfToken: localStorage.getItem('csrfToken') || '',
  login: (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    set({ isAuthenticated: true, token, email });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('csrfToken');
    set({ isAuthenticated: false, token: null, email: '', csrfToken: '' });
  },
  setCSRFToken: (token) => {
    localStorage.setItem('csrfToken', token);
    set({ csrfToken: token });
  },
}));

export default useAuthStore;
