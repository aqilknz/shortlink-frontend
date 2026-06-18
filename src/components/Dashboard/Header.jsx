import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuthForce } from '../../redux/slices/authSlice';
import Button from '../Auth/Button';
import DefaultAvatar from '../../assets/images/default.png';
import { Modal } from '../Auth/Modal';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(clearAuthForce());
        setIsMobileMenuOpen(false);
        setIsLogoutModalOpen(false);
        navigate('/auth/login');
    };

    const handleNavigation = (path) => {
        setIsMobileMenuOpen(false);
        navigate(path);
    };
    const getNavLinkClass = (path) => {
        return location.pathname === path
            ? "text-primary border-b-2 border-primary py-5"
            : "text-[#64748b] hover:text-black border-b-2 border-transparent py-5 transition-colors";
    };

    return (
        <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between font-main">

                {/* Bagian Kiri: Logo & Navigasi */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-black font-extrabold text-xl tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>
                        ShortLink
                    </Link>

                    {isAuthenticated && (
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#64748b]">
                            <Link to="/dashboard" className={getNavLinkClass('/dashboard')} >Dashboard</Link>
                            <Link to="/dashboard/analytics" className={getNavLinkClass('/analytics')}>Analytics</Link>
                            <Link to="/dashboard/links" className={getNavLinkClass('/links')}>Links</Link>
                        </nav>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="hidden md:flex justify-center items-center gap-4">
                            <Button color="blue" size="full" shape="rectangle" onClick={() => navigate('/dashboard/create-link')} className="text-sm font-extrabold px-4 flex justify-center items-center gap-2">
                                <span>+</span> Create New Link
                            </Button>

                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                <img src={DefaultAvatar} alt="Profile" onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full object-cover border border-gray-200 cursor-pointer" />
                                <button onClick={() => setIsLogoutModalOpen(true)} className="text-sm font-semibold text-[#64748b] hover:text-important cursor-pointer transition-colors">
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Tampilan SEBELUM Login */
                        <div className="hidden md:flex items-center gap-2">
                            <Button color="white" size="Full" shape="rectangle" onClick={() => navigate('/auth/login')} className="text-lg font-extrabold px-2 border-transparent hover:bg-gray-50">
                                Sign In
                            </Button>
                            <Button color="blue" size="Full" shape="rectangle" onClick={() => navigate('/auth/register')} className="text-lg font-extrabold px-2">
                                Sign Up
                            </Button>
                        </div>
                    )}

                    {/* Hamburger Button */}
                    <button className="md:hidden p-2 text-3xl text-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                inner="max-w-xs w-full p-6 text-center"
            >
                <h3 className="text-lg font-bold text-black mb-2">Confirm Logout</h3>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out of your account?</p>
                <div className="flex gap-2">
                    <Button color="important" size="full" onClick={handleLogout} className='hover:bg-important hover:text-white'>Yes, Logout</Button>
                    <Button color="grey" size="full" onClick={() => setIsLogoutModalOpen(false)} className='hover:bg-primary hover:text-white'>Cancel</Button>
                </div>
            </Modal>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t absolute top-full left-0 w-full border-gray-100 p-4 flex flex-col gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" onClick={() => handleNavigation('/dashboard')} className="text-md text-center font-medium hover:text-primary">Dashboard</Link>
                            <Button
                                color="white"
                                size="full"
                                onClick={() => handleNavigation('/dashboard/profile')}
                                className="border border-gray-200 hover:bg-primary hover:text-white cursor-pointer"
                            >
                                My Profile
                            </Button>
                            <Button color="blue" size="full" onClick={() => navigate('/dashboard/create-link')}>+ Create New Link</Button>
                            <Button
                                color="white"
                                size="full"
                                onClick={() => {
                                    setIsLogoutModalOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className='hover:bg-important hover:text-white cursor-pointer'
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="white" size="full" onClick={() => handleNavigation('/auth/login')}>Sign In</Button>
                            <Button color="blue" size="full" onClick={() => handleNavigation('/auth/register')}>Sign Up</Button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;