import { useState } from "react";

export type RecipeProps = {
    name: string;
    description?: string;
    image: string;
    category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
  };
  
  const Class = ({ category, isSelected, onSelect, name, description, image }: RecipeProps) => {
    const handleClick = () => {
        onSelect(category);
      };    

    const overlayStyles = `p-5 absolute z-30 flex
    h-[380px] w-[450px] flex-col items-center justify-center
    whitespace-normal bg-primary-500 text-center text-white
    opacity-0 transition duration-500 hover:opacity-90`;
    
    return (
        <button onClick={handleClick}
        style={{
          backgroundColor: isSelected ? 'black' : 'white',
        }}
  >
        <li className="relative mx-5 inline-block h-[380px] w-[450px]">
          <div className={overlayStyles}>
            <p className="text-2xl">{name}</p>
            <p className="mt-5">{description}</p>
          </div>
          <img alt={`${image}`} src={image} />
        </li>
        </button>
    );
  };
  
  export default Class;