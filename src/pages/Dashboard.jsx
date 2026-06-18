import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchLinks, removeLink } from '../redux/slices/linkSlice';
import MainLayout from '../components/Layout/MainLayout';
import LinkCard from '../components/Dashboard/LinkCard';
import { Search } from 'lucide-react';
import { Modal } from '../components/Auth/Modal';

function Dashboard() {
    const dispatch = useDispatch();
    const { data: links, meta, isLoading, error } = useSelector((state) => state.links);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [linkToDelete, setLinkToDelete] = useState(null);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            dispatch(fetchLinks({ page: 1, limit: 10, search: searchTerm }));
        }, 500); 

        return () => clearTimeout(delaySearch);
    }, [dispatch, searchTerm]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleDeleteClick = (id) => {
        setLinkToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!linkToDelete) return;
        
        try {
            await dispatch(removeLink(linkToDelete)).unwrap();
            toast.success("Link deleted successfully");
        } catch (err) {
            toast.error(err || "Failed to delete link");
        } finally {
            setIsDeleteModalOpen(false);
            setLinkToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setLinkToDelete(null);
    };

    return (
        <MainLayout>
            <div className="mb-6 lg:mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 lg:w-1/2 mx-auto">
                <div>
                    <h1 className="text-2xl font-bold text-black text-center md:text-left">My Links</h1>
                    <p className="text-gray-500 text-sm md:text-base text-center md:text-left mt-1">Manage and track your shortened digital assets.</p>
                </div>
                <div className="text-center md:text-right mt-4 md:mt-0 bg-white md:bg-transparent p-4 md:p-0 rounded-xl border border-gray-100 md:border-none shadow-sm md:shadow-none">
                    <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Total Active</p>
                    <p className="text-3xl font-bold text-black">{meta?.total_records || 0}</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 mx-auto mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-gray-400" size={20} />
                </div>
                <input 
                    type="text"
                    placeholder="Search by name or URL..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 rounded-xl border border-gray-200 outline-none focus:border-blue-500 shadow-sm text-sm"
                />
            </div>

            <div className="w-full lg:w-1/2 mx-auto space-y-4">
                {isLoading ? (
                    <div className="text-center py-10 text-gray-500">Loading your links...</div>
                ) : links?.length > 0 ? (
                    links.map((link) => (
                        <LinkCard 
                            key={link.id} 
                            slug={link.slug} 
                            longUrl={link.original_url} 
                            createdAt={link.created_at} 
                            clicks={link.click_count || 0}
                            onDelete={() => handleDeleteClick(link.id)} 
                        />
                    ))
                ) : (
                    <div className="text-center py-12 px-4 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-sm">No links found. Let's create one!</p>
                    </div>
                )}
            </div>
            
            {meta?.total_pages > 1 && (
                <div className="w-full lg:w-1/2 mx-auto flex justify-between md:justify-center mt-8 gap-2 md:gap-4 text-sm font-bold items-center">
                    <button 
                        disabled={meta.current_page === 1}
                        onClick={() => dispatch(fetchLinks({ page: meta.current_page - 1, limit: 10, search: searchTerm }))}
                        className={`px-3 md:px-4 py-2 rounded-md ${meta.current_page === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'} flex-1 md:flex-none text-center`}
                    >
                        Prev
                    </button>
                    
                    <span className="bg-blue-50 text-blue-600 px-3 md:px-4 py-2 rounded-md whitespace-nowrap">
                        {meta.current_page} / {meta.total_pages}
                    </span>
                    
                    <button 
                        disabled={meta.current_page === meta.total_pages}
                        onClick={() => dispatch(fetchLinks({ page: meta.current_page + 1, limit: 10, search: searchTerm }))}
                        className={`px-3 md:px-4 py-2 rounded-md ${meta.current_page === meta.total_pages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'} flex-1 md:flex-none text-center`}
                    >
                        Next
                    </button>
                </div>
            )}

            <Modal 
                isOpen={isDeleteModalOpen} 
                onClose={cancelDelete}
                inner="max-w-xs w-full p-6 text-center mx-4"
            >
                <h3 className="text-lg font-bold text-black mb-2">Confirm Delete</h3>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this link?</p>
                <div className="flex gap-3">
                    <button 
                        onClick={confirmDelete} 
                        className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
                    >
                        Yes, Delete
                    </button>
                    <button 
                        onClick={cancelDelete} 
                        className="w-full bg-white text-gray-700 border border-gray-200 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </MainLayout>
    );
}

export default Dashboard;