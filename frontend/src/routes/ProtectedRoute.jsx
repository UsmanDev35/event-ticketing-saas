// // src/routes/ProtectedRoute.jsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function ProtectedRoute({ allowedRoles }) {
//   // 1. Read the current memory from the Redux "Brain"
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   // 2. Bouncer Check #1: Authentication (Who are you?)
//   if (!isAuthenticated) {
//     // If they have no token, kick them to the login screen.
//     // The "replace" keyword deletes the protected page from their browser history 
//     // so they can't just click the "Back" arrow to bypass this.
//     return <Navigate to="/login" replace />;
//   }

//   // 3. Bouncer Check #2: Authorization / RBAC (What can you do?)
//   // If this route requires specific roles, and the user's role isn't in that list...
//   if (allowedRoles && user && !allowedRoles.includes(user.role)) {
//     // They are logged in, but they don't have the right VIP pass (e.g., a Customer trying to access Admin).
//     // Kick them back to the safe public marketplace.
//     return <Navigate to="/" replace />;
//   }

//   // 4. Access Granted!
//   // If they pass the checks, the <Outlet /> acts as an open door, 
//   // rendering whatever private page they were trying to visit.
//   return <Outlet />;
// }



// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // -------------------------------------------------------------
  // DEBUGGING: Open your browser console (F12) to see this output
  // -------------------------------------------------------------
  console.log("👮‍♂️ BOUNCER CHECK:");
  console.log("-> Is Authenticated?:", isAuthenticated);
  console.log("-> User Data:", user);

  // 1. Authentication Check
  if (!isAuthenticated) {
    console.log("-> Action: User kicked to /login!");
    return <Navigate to="/login" replace />;
  }

  // 2. Authorization (RBAC) Check
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    console.log("-> Action: User lacks role, kicked to /");
    return <Navigate to="/" replace />;
  }

  console.log("-> Action: Access Granted!");
  return <Outlet />;
}