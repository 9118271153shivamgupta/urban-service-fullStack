import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // 1. Check karein user login hai ya nahi
    if (!user) {
        return <Navigate to="/login" />;
    }

    // 2. Agar koi specific role manga gaya hai (prop ke through) toh use check karein
    if (role && user.role !== role) {
        alert(`Access Denied: ${role} Only!`);
        return <Navigate to="/" />;
    }

    // 3. Agar role sahi hai toh children dikhayein
    return children;
};

export default AdminRoute;