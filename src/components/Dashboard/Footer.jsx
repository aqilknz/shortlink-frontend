import { Link } from 'react-router';

function Footer() {
    return (
        <footer className="w-full bg-[#f4f7fa] border-t border-gray-200 py-8 font-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-[#94a3b8] uppercase tracking-wider gap-4">
                <p>© 2024 SHORTLINK. THE DIGITAL ARCHITECT.</p>
                <div className="flex items-center gap-6">
                    <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="#" className="hover:text-primary transition-colors">API Documentation</Link>
                    <Link to="#" className="hover:text-primary transition-colors">Support</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;