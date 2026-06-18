function FeatureCard({ icon, title, description, iconBg = "bg-blue-100", iconColor = "text-blue-600", lineColor = "bg-blue-300" }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-50 flex flex-col items-start font-main transition-transform hover:-translate-y-1">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg} ${iconColor} mb-6`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-black mb-3">{title}</h3>
            <p className="text-sm text-[#64748b] leading-relaxed mb-6 flex-grow">
                {description}
            </p>
            <div className={`w-8 h-1 ${lineColor} rounded-full`}></div>
        </div>
    );
}

export default FeatureCard;