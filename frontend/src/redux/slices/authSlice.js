// // src/redux/slices/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   // We check localStorage in case the user refreshed the page
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   user: null, // Will hold { id, name, email, role }
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // Action: When login succeeds, we save the token and user data
//     loginSuccess: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//       // Securely store the token in the browser so it survives a refresh
//       localStorage.setItem('token', action.payload.token);
//     },
//     // Action: When the user logs out, we wipe everything
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('token');
//     }
//   }
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;



// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 1. Get the token from memory (using a unique key to prevent localhost conflicts)
const savedToken = localStorage.getItem('eventrix_token');

// 2. STRICT CHECK: Ensure it is a real token, not a ghost string like "null" or "undefined"
const hasValidToken = savedToken && savedToken !== 'null' && savedToken !== 'undefined' && savedToken !== '';

const initialState = {
  token: hasValidToken ? savedToken : null,
  isAuthenticated: !!hasValidToken, // This will now correctly be false if no valid token
  user: null, 
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('eventrix_token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('eventrix_token');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;