import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        const userData = res.data.user;

        if (userData) {
            // 1. Data Save Karein
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', res.data.token);

            // 2. Role-Based Navigation Logic
            switch (userData.role) {
                case 'superadmin':
                    alert("Welcome Super Admin!");
                    navigate('/superadmin-dashboard');
                    break;
                case 'admin':
                    alert("Welcome Admin!");
                    navigate('/admin-dashboard');
                    break;
                case 'provider':
                    alert("Welcome Service Provider!");
                    navigate('/provider-dashboard');
                    break;
                case 'customer':
                    alert("Login Successful!");
                    navigate('/'); // Customer Home page par hi rahega
                    break;
                default:
                    navigate('/');
            }
            
            // Navbar ko update karne ke liye
            window.location.reload(); 
        }

    } catch (err) {
        alert(err.response?.data?.message || "Invalid Credentials!");
    }
};

    return (
        <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4"
         style={{ backgroundImage: "url('./hero.jpg')" }} 
         >
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl min-h-[500px]">
                
                {/* Left Side: Green Branding (Hidden on small mobile if needed, but styled for all) */}
                <div className="md:w-1/2 bg-black p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500 rounded-full opacity-20"></div>
                    
                    <div className="z-10">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-black text-3xl"><img src="./tablogo.png" alt="" /></span>
                        </div>
                        <h2 className="text-xl font-semibold mb-6">Urban Service</h2>
                        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                        <p className="text-sm opacity-80 mb-8">To stay connected with us please login with your personal info</p>
                        <Link to="/register" className="border-2 border-white px-10 py-2 rounded-full hover:bg-white hover:text-green-700 transition font-medium">
                            SIGN UP
                        </Link>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-2">welcome</h2>
                    <p className="text-gray-500 text-sm mb-8">Login in to your account to continue</p>
                    
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <input 
                            type="email" 
                            placeholder="Email........" 
                            className="w-full bg-emerald-50 border-none rounded-full px-6 py-3 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password........" 
                            className="w-full bg-emerald-50 border-none rounded-full px-6 py-3 mb-2 focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            required 
                        />
                        
                        <div className="text-right mb-6">
                            <Link to="/forgot-password" size="sm" className="text-blue-600 hover:underline      text-sm font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-full hover:bg-emerald-600 transition shadow-lg mb-4">
                            LOG IN
                        </button>
                    </form>
                    
                    <p className="text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-emerald-600 font-bold">sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;