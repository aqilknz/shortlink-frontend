export const Modal = ({ className = "", isOpen, onClose, children, inner = "" }) => {
  if (!isOpen) return null;
  
  const defaultClass = "fixed inset-0 bg-black/60 flex items-center justify-center z-[100]";
  const defaultInner = "bg-white rounded-lg mx-4";

  return (
    <div onClick={onClose} className={`${defaultClass} ${className}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${defaultInner} ${inner}`}
      >
        {children}
      </div>
    </div>
  );
};