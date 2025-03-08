import React from 'react';
import AppAsset from "@/core/AppAsset";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-auto h-auto md:w-[325px] md:h-[76px] border-2 border-primary 
        bg-transparent text-primary font-semibold rounded-full md:rounded-full 
        text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 
        hover:bg-primary hover:text-white transition-all duration-300 
        flex flex-row items-center justify-center gap-3 ${className}`}>
      <p>{label}</p>
      <img
        src={AppAsset.RightArrowGreenicon}
        className="w-[36px] object-contain"
      />
    </button>
  );
};

export default Button; 