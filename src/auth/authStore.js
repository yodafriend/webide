import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email') || '', 
    login: (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);   
        set({ isAuthenticated: true, token, email });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');  
        set({ isAuthenticated: false, token: null, email: '' });
    },
}));

export default useAuthStore;