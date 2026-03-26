interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void; 
}

const ActionButton = ({ children, onClick }: ActionButtonProps) => {
    return (
        <button 
            type={ 'button'}
            onClick={onClick}
            className="
              min-w-[120px] px-6 py-2.5
              bg-white/20 hover:bg-white/40 
              backdrop-blur-md
              border border-white/40
              text-black font-medium
              rounded-lg shadow-lg
              transition-all duration-300 active:scale-95
              cursor-pointer
            "
        >
            {children}
        </button>
    );
};

export default ActionButton;