import Header from "../Dashboard/Header.jsx";
import Footer from "../Dashboard/Footer.jsx";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}

export default MainLayout;