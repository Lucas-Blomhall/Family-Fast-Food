import React, { useState } from 'react';

type DropdownProps = {
  options: string[];
};

const Dropdown = ({ options }: DropdownProps) => {

    const ArrayOfOptions: typeof options = ["1 Port", "2 Port", "4 Port", "6 Port", "8 Port", "10 Port", "12 port", "14 Port"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start">
      <button onClick={toggling} className="py-2 px-4 bg-blue-500 text-white">
        {selectedOption || "Select an Option"}
      </button>
      {isOpen && (
        <ul className="py-2">
{ArrayOfOptions.map((option) => (
            <li
              className="text-gray-700 py-1 px-3 cursor-pointer hover:bg-gray-200"
              onClick={onOptionClicked(option)}
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;


