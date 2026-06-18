import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addLink } from '../redux/slices/linkSlice';
import toast from 'react-hot-toast';
import MainLayout from '../components/Layout/MainLayout';
import { ArrowLeft, Link as LinkIcon, Eye, Zap, LineChart, QrCode } from 'lucide-react';

function CreateLink() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.links);

    const [originalUrl, setOriginalUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            toast.error('Destination URL must start with http:// or https://');
            return;
        }

        try {
            await dispatch(addLink({ 
                original_url: originalUrl, 
                custom_slug: customSlug 
            })).unwrap();

            toast.success("Short link created successfully!");
            navigate('/dashboard');
        } catch (err) {
            toast.error(err || "Failed to create link");
        }
    };

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto w-full pb-10 text-left">
                <Link 
                    to="/dashboard" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>

                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">Create New Short Link</h1>
                    <p className="text-gray-500 text-sm md:text-base">Transform your long URLs into clean, manageable assets.</p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        <div>
                            <label className="block text-xs font-bold text-gray-900 tracking-wide mb-2">
                                DESTINATION URL <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LinkIcon className="text-gray-400" size={18} />
                                </div>
                                <input 
                                    type="url" 
                                    required
                                    placeholder="https://example.com/your-long-url-here" 
                                    value={originalUrl}
                                    onChange={(e) => setOriginalUrl(e.target.value)}
                                    className="w-full py-3 pl-11 pr-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm md:text-base"
                                />
                            </div>
                            <p className="text-xs text-gray-400 italic mt-2">Ensure your URL starts with http:// or https://</p>
                        </div>

                        {/* Input: Custom Slug */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 tracking-wide mb-2">
                                CUSTOM SLUG (OPTIONAL)
                            </label>
                            <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                                <span className="bg-gray-50 px-4 py-3 text-gray-500 font-medium border-r border-gray-200 text-sm md:text-base flex items-center">
                                    shrt.lnk/
                                </span>
                                <input 
                                    type="text" 
                                    placeholder="my-custom-slug" 
                                    value={customSlug}
                                    onChange={(e) => setCustomSlug(e.target.value)}
                                    className="w-full px-4 py-3 outline-none text-sm md:text-base"
                                />
                            </div>
                            <p className="text-xs text-gray-400 italic mt-2">Leave blank to generate a random unique identifier.</p>
                        </div>

                        {/* Live Preview Box */}
                        <div className="bg-[#f0f4ff] border border-[#d6e4ff] rounded-xl p-5 flex items-start gap-3 mt-2">
                            <Eye className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Live Preview</p>
                                <p className="text-sm text-gray-800 truncate">
                                    Your short link will be: <span className="text-blue-600 font-medium">https://shrt.lnk/{customSlug || 'random-id'}</span>
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full md:w-auto flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Creating...' : (
                                    <>Create Link <Zap size={18} /></>
                                )}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="w-full md:w-auto text-gray-500 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Bottom Features Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                            <LineChart size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-black text-sm md:text-base mb-1">Real-time Analytics</h4>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                Track every click, geographical location, and referral source instantly.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                            <QrCode size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-black text-sm md:text-base mb-1">Auto-generated QR</h4>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                Every link automatically creates a high-resolution QR code for print.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}

export default CreateLink;