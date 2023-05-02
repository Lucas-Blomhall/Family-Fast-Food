import React from 'react';
import {FoodCategoryButtonProps} from '@/shared/AllInterfaces';

const thetestforcategories = ({ category, isSelected, onSelect }: FoodCategoryButtonProps) => {
    const handleClick = () => {
      onSelect(category);
    };
  
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: isSelected ? 'black' : 'white',
        }}
      >
        {category}
      </button>
    );
  };
  
  export default thetestforcategories;
  