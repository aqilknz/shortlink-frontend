import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState,useEffect } from 'react';
import { clearAuthForce } from '../redux/slices/authSlice';
import MainLayout from '../components/Layout/MainLayout';
import { Edit2, Link as LinkIcon, Bell, Shield, LogOut } from 'lucide-react';
import DefaultAvatar from '../assets/images/default.png';
import { Modal } from '../components/Auth/Modal';
import { fetchLinks } from '../redux/slices/linkSlice';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.auth);
    const { meta } = useSelector((state) => state.links);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    useEffect(() => {
        dispatch(fetchLinks({ page: 1, limit: 1, search: "" }));
    }, [dispatch]);

    const handleLogout = () => {
        setIsLogoutModalOpen(false);
        dispatch(clearAuthForce());
        navigate('/auth/login');
    };

    const userName = currentUser?.name || 'User';
    const userEmail = currentUser?.email || 'user@example.com';
    const totalLinks = meta?.total_records || 0;
    const rawCreatedAt = currentUser?.createdAt;
    const formattedTenure = rawCreatedAt
        ? new Date(rawCreatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto w-full pb-10">

                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">
                    Account Management
                </h3>

                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">

                    {/* Title & Badge */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-black">Profile</h1>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-bold rounded-full tracking-wide uppercase">
                            Pro Member
                        </span>
                    </div>

                    {/* Avatar & User Info */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative">
                            <img
                                src={DefaultAvatar}
                                alt="User Avatar"
                                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-sm border border-gray-100"
                            />
                            <button className="absolute -bottom-2 -right-2 bg-white border border-gray-200 p-2 rounded-xl text-blue-600 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                                <Edit2 size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl text-left md:text-2xl font-bold text-black mb-1">{userName}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-5">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</p>
                            <p className="text-black font-medium">{userEmail}</p>
                        </div>
                        <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-5">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Account Tenure</p>
                            <p className="text-black font-medium">{formattedTenure}</p>
                        </div>
                    </div>

                    {/* Active Assets Banner */}
                    <div className="bg-[#0D47A1] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="flex items-center gap-4 text-white w-full md:w-auto">
                            <div className="bg-white/20 p-3 rounded-xl shrink-0">
                                <LinkIcon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Active Assets</p>
                                <p className="text-3xl font-black">{totalLinks}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full md:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-colors text-sm"
                        >
                            VIEW LINKS
                        </button>
                    </div>

                    {/* Toggles / Settings List */}
                    <div className="flex flex-col gap-2 mb-8">
                        <div className="flex justify-between items-center py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Bell className="text-gray-400" size={20} />
                                <span className="text-gray-900 font-medium text-sm md:text-base">Email Notifications</span>
                            </div>
                            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center gap-3">
                                <Shield className="text-gray-400" size={20} />
                                <span className="text-gray-900 font-medium text-sm md:text-base">Two-Factor Authentication</span>
                            </div>
                            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                                Disabled
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full py-4 border cursor-pointer border-gray-200 rounded-xl flex justify-center items-center gap-2 text-gray-700 font-bold hover:bg-gray-50 transition-colors hover:bg-important hover:text-white"
                    >
                        <LogOut size={18} />
                        Logout Session
                    </button>

                </div>

                {/* Footer Security Note */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    Your data is encrypted using AES-256 standards. <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>

            </div>
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                inner="max-w-xs w-full p-6 text-center mx-4"
            >
                <h3 className="text-lg font-bold text-black mb-2">Confirm Logout</h3>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out of your account?</p>
                <div className="flex gap-3">
                    <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
                    >
                        Yes, Logout
                    </button>
                    <button
                        onClick={() => setIsLogoutModalOpen(false)}
                        className="w-full cursor-pointer bg-white text-gray-700 border border-gray-200 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </MainLayout>
    );
}

export default Profile;