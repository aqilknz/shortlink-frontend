import { Copy, Trash2, BarChart2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

function LinkCard({ slug, longUrl, createdAt, clicks, onDelete }) {
    const actualShortLink = `http://localhost:8080/${slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(actualShortLink);
        toast.success("Link copied to clipboard!");
    };

    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).toUpperCase();

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100  text-left shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div className="flex flex-col gap-1 overflow-hidden">

                <a 
                    href={actualShortLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 font-bold text-lg hover:underline truncate"
                >
                    shrt.lnk/{slug}
                </a>
                
                <p className="text-sm text-gray-500 truncate max-w-md">
                    {longUrl}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-xs text-gray-400 font-semibold mt-2 uppercase tracking-wide">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} /> 
                        {formattedDate}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BarChart2 size={14} /> 
                        {clicks} CLICKS
                    </div>
                </div>
            </div>
            
            {/* Bagian Kanan: Aksi */}
            <div className="flex items-center gap-2 ml-4">
                <button 
                    onClick={handleCopy}
                    className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy Link"
                >
                    <Copy size={20} />
                </button>
                <button 
                    onClick={onDelete}
                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Link"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}

export default LinkCard;