import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Header from '../components/Dashboard/Header';
import Footer from '../components/Dashboard/Footer';
import FeatureCard from '../components/Dashboard/FeatureCard';
import Button from '../components/Auth/Button';
import { Modal } from '../components/Auth/Modal';
import LandingImg from '../assets/images/image-LP.png';
import MainLayout from '../components/Layout/MainLayout';

function LandingPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [longUrl, setLongUrl] = useState('');
    // State untuk mengontrol Modal
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleShortenAction = (e) => {
        e.preventDefault();

        if (!longUrl) {
            toast.error("Please enter a URL first!");
            return;
        }

        if (!isAuthenticated) {
            // Tampilkan Modal jika belum login
            setIsAuthModalOpen(true);
            return;
        }

        // --- Logika Jika Sudah Login ---
        // dispatch(createLinkAPI({ original_url: longUrl }))
        toast.success("Ready to shorten!");
    };

    return (
        <MainLayout>
            <h1 className="text-[56px] leading-[1.1] font-extrabold text-black tracking-tight mb-6 max-w-4xl">
                Shorten URLs. <span className="text-blue-600">Share Easily.</span>
            </h1>
            <p className="text-lg text-[#64748b] mb-10 max-w-2xl">
                Create short, memorable links for your team communications.
                Transform long, cumbersome URLs into powerful digital assets that drive engagement.
            </p>

            <div className="flex gap-4 mb-14">
                <Button color="blue" size="medium" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/auth/register')}>
                    Get Started
                </Button>
                <Button color="gray" size="medium" className="bg-white border border-gray-200">
                    Learn More
                </Button>
            </div>

            {/* Input Shortener */}
            <form
                onSubmit={handleShortenAction}
                className="w-full max-w-3xl bg-white p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-2"
            >
                <div className="pl-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <input
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                    className="flex-grow py-3 px-2 outline-none text-gray-700 bg-transparent"
                />
                <Button type="submit" color="blue" shape="rectangle" className="px-8 whitespace-nowrap">
                    Shorten
                </Button>
            </form>

            {/* --- FEATURES SECTION --- */}
            <section className="bg-[#f4f7fa] py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Architectural Features</p>
                    <h2 className="text-3xl font-extrabold text-black mb-12">Built for Enterprise Precision</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="Easy Create"
                            description="Instantly generate high-performance short links with a single click or through our surgical API endpoints."
                            icon={<span className="font-bold text-xl">⚡</span>}
                            iconBg="bg-indigo-100" iconColor="text-indigo-600" lineColor="bg-indigo-300"
                        />
                        <FeatureCard
                            title="Custom Slugs"
                            description="Maintain brand authority with readable, custom link endings that resonate with your digital audience."
                            icon={<span className="font-bold text-xl">🔗</span>}
                            iconBg="bg-blue-100" iconColor="text-blue-600" lineColor="bg-blue-300"
                        />
                        <FeatureCard
                            title="Team Ready"
                            description="Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards."
                            icon={<span className="font-bold text-xl">👥</span>}
                            iconBg="bg-orange-100" iconColor="text-orange-600" lineColor="bg-orange-300"
                        />
                    </div>
                </div>
            </section>

            {/* --- INSIGHTS SECTION --- */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 ">
                        <img src={LandingImg} alt='landing-image' className="w-full h-full flex object-cover "></img>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Data Driven Insights</p>
                        <h2 className="text-3xl font-extrabold text-black mb-6 leading-tight">Observe your link architecture in real-time.</h2>
                        <p className="text-[#64748b] mb-8 leading-relaxed">
                            Every click is a data point. Our dashboard provides surgical precision into where your traffic originates, who is engaging, and how your team communications are performing across the globe.
                        </p>

                        <ul className="space-y-4 text-sm font-semibold text-black">
                            <li className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">✓</span>
                                Geographic Distribution Maps
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">✓</span>
                                Device & Browser Breakdown
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">✓</span>
                                UTM Parameter Tracking
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- MODAL AUTHENTICATION --- */}
            <Modal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                inner="max-w-md w-full p-8 text-center"
            >
                {/* Icon Hiasan */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in Required</h2>
                <p className="text-gray-500 text-sm mb-8">
                    To create, manage, and track your shortened URLs, please log in or create a free account.
                </p>

                <div className="flex flex-col gap-3">
                    <Button color="blue" size="full" onClick={() => navigate('/auth/register')}>
                        Create an Account
                    </Button>
                    <Button color="gray" size="full" onClick={() => navigate('/auth/login')}>
                        Log In
                    </Button>
                </div>

                <button
                    onClick={() => setIsAuthModalOpen(false)}
                    className="mt-6 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </Modal>
        </MainLayout>
    )
}

export default LandingPage;