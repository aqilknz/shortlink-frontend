import { Link, useNavigate } from 'react-router';
import { Unlink, AlertTriangle, ArrowLeft, BarChart2, Link2, Boxes } from 'lucide-react';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white font-main selection:bg-blue-100">
            
            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 pt-20 pb-10">
                
                {/* --- Illustration Graphic --- */}
                <div className="relative mb-8">
                    {/* Circle Background */}
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <Unlink className="text-gray-400" size={40} strokeWidth={2} />
                    </div>
                    {/* Floating Warning Badge */}
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-sm transform rotate-12">
                        <AlertTriangle size={16} strokeWidth={3} />
                    </div>
                </div>

                {/* --- Text Content --- */}
                <h1 className="text-5xl font-black text-blue-600 mb-3 tracking-tight">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-gray-500 text-center max-w-sm mb-8 leading-relaxed text-sm md:text-base">
                    The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
                </p>

                {/* --- Action Buttons --- */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={18} />
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={() => window.location.href = 'mailto:support@shortlink.com'}
                        className="w-full sm:w-auto bg-white text-blue-600 border border-gray-200 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Report an Issue
                    </button>
                </div>

                {/* --- Quick Links Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                    
                    {/* Card 1 */}
                    <Link to="/dashboard/analytics" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group text-left flex flex-col gap-3">
                        <BarChart2 className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Check Analytics</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Track your active links and traffic sources in real-time.
                            </p>
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link to="/dashboard/create-link" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group text-left flex flex-col gap-3">
                        <Link2 className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-1">New ShortLink</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Create a brand new architected URL in seconds.
                            </p>
                        </div>
                    </Link>

                    {/* Card 3 */}
                    <a href="#" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group text-left flex flex-col gap-3">
                        <Boxes className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Developer API</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Integrate our link infrastructure into your apps.
                            </p>
                        </div>
                    </a>

                </div>
            </main>

        </div>
    );
}

export default NotFound;