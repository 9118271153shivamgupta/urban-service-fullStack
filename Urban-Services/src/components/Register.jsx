import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(res.data.message);
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div 
            className="min-h-screen bg-gray-600 flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('./hero.jpg')" }} 
        >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse w-full max-w-4xl min-h-[500px]">
                
                {/* Right Side: Green Branding */}
                <div className="md:w-1/2 bg-black p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 rounded-full opacity-20"></div>
                    
                    <div className="z-10">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-3xl"><img src="./tablogo.png" alt="" /></span>
                        </div>
                        <h2 className="text-xl font-semibold mb-6">blueflame</h2>
                        <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                        <p className="text-sm opacity-80 mb-8">Enter your personal details and start your journey with us</p>
                        <Link to="/login" className="border-2 border-white px-10 py-2 rounded-full hover:bg-white hover:text-green-700 transition font-medium">
                            SIGN IN
                        </Link>
                    </div>
                </div>

                {/* Left Side: Form */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-2">Create Account</h2>
                    <p className="text-gray-500 text-sm mb-8">Fill the details to get started</p>
                    
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <input 
                            type="text" 
                            placeholder="Full Name........" 
                            className="w-full bg-emerald-50 border-none rounded-full px-6 py-3 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            required 
                        />
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
                            className="w-full bg-emerald-50 border-none rounded-full px-6 py-3 mb-6 focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            required 
                        />
                        
                        <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-full hover:bg-emerald-600 transition shadow-lg mb-4">
                            SIGN UP
                        </button>
                    </form>
                    
                    <p className="text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="text-emerald-600 font-bold">sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;