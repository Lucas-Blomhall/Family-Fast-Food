import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import ActionButton from "@/shared/ActionButton";
import FamilyFastFoodHatTransBackgroundText from "@/assets/FamilyFastFoodHatTransBackgroundText.png";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import RecipesButton from "@/shared/RecipesButton";
import { Link } from 'react-router-dom';


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const CardMenu = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const cards = [
    { title: 'Create a new Recipe', route: '/route1' },
    { title: 'Create a new Ingredient', route: '/route2' },
    { title: 'Update a Recipe', route: '/route3' },
    // Add more cards here
];



  return (
    <section id="cardmenu" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.CardMenu)}
      >
            <div className="flex flex-wrap justify-around">
                {cards.map((card, index) => (
                    <Link to={card.route} key={index} className="m-4">
                        <div className="w-64 h-64 bg-gray-200 rounded shadow-md flex items-center justify-center">
                            <h2>{card.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
      </motion.div>
    </section>
  );
};

export default CardMenu;