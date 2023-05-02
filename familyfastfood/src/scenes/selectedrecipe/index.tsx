import { SelectedPage, RecipeType } from "@/shared/types";
import { motion } from "framer-motion";
import Image1Meat from "@/assets/Image1Meat.jpg";
import HText from "@/shared/HText";
import Recipe from "./Recipe";
import { useState } from "react";
import ClassFile, { RecipePropsagain } from "@/shared/ClassFile";

const classes: RecipeType[] = [
  {
    name: "Meat dishes",
    description:
      "Här hittar du några av dem bästa maträtterna till grillen.",
    image: Image1Meat,
    category: "Meat",
  },
  {
    name: "Vegetarian dishes",
    image: Image1Meat,
    category: "Vegetarian",
  },
  {
    name: "Diet dishes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Image1Meat,
    category: "Diet",
  },
  {
    name: "etc",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Image1Meat,
    category: "etc1",
  },
  {
    name: "etc2",
    image: Image1Meat,
    category: "etc2",
  },
  {
    name: "etc3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: Image1Meat,
    category: "etc3",
  },
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const SelectedRecipe = ({ setSelectedPage }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
      };
    
  return (
    <section id="selectedrecipe" className="w-full bg-primary-100 py-40">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.SelectedRecipe)}
      >
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="md:w-3/5">
            <HText>Some food categories</HText>
            <p className="py-5">
              Here you can find some of the food categories I have added to the website.
            </p>
          </div>
        </motion.div>
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[2800px] whitespace-nowrap">
            {classes.map((item: RecipeType, index) => (
              <ClassFile
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                image={item.image}
                category={item.category}
                isSelected={item.category === selectedCategory}
                onSelect={handleCategorySelect}
              />
            ))}
            {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default SelectedRecipe;