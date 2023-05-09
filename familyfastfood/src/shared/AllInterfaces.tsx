export interface FoodCategoryButtonProps {
    category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
}

export interface RouteParams {
  id: string;
}

