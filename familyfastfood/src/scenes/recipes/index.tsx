import ActionButton from "@/shared/ActionButton";
import HText from "@/shared/HText";
import { RecipesType, SelectedPage } from "@/shared/types";
import {
  HomeModernIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import lucasselfiefffbackground from "@/assets/lucasselfiefffbackground.png";
import Recipesfile from "./Recipesfile";
import { useState } from "react";

const benefits: Array<RecipesType> = [
  {
    icon: <HomeModernIcon className="h-6 w-6" />,
    title: "Vegetarian recognition",
    description:
      "If you are vegetarian. Or want to filter away all the recipes with some ingredients for example: pig, lactose, high sugar, etc.",
    },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "Food that gives energy to the gym?",
    description:
      "I have calculated the nutrition in each ingredient and it will calculate the total amount for each meal at the bottom of the recipes. You can for example filter food with: High protein value, Healthy fats, Vitamins, Minerals, Dietary fiber and Dietary fiber. You can also filter the recipes with less Carbohydrates",
    },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: "Do you want a delicious food for work, for less money?",
    description:
      "I have made a calculator that will calculate the nutrition value and there is also star rating that the community can vote on. With some extra data we can check how expensive the food will be.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Recipes = ({ setSelectedPage }: Props) => {
  return (
    <section id="recipes" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Recipes)}
      >
        {/* HEADER */}
        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>The standards on the recipes</HText>
          <p className="my-5 text-sm">
            I give you a website where you can create your own recipe that are categorized and calculated for every need. It has some standards and some of the services my website gives you for your need are: 
          </p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {benefits.map((recipes: RecipesType) => (
            <Recipesfile
              key={recipes.title}
              icon={recipes.icon}
              title={recipes.title}
              description={recipes.description}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>

        {/* GRAPHICS AND DESCRIPTION */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src={lucasselfiefffbackground}
          />

          {/* DESCRIPTION */}
          <div>
            {/* TITLE */}
            <div className="relative">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <HText>
                    Hundreds of different{" "}
                    <span className="text-primary-500">cooking recipes</span>
                  </HText>
                </motion.div>
              </div>
            </div>

            {/* DESCRIPT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="my-5">
                Nascetur aenean massa auctor tincidunt. Iaculis potenti amet
                egestas ultrices consectetur adipiscing ultricies enim. Pulvinar
                fames vitae vitae quis. Quis amet vulputate tincidunt at in
                nulla nec. Consequat sed facilisis dui sit egestas ultrices
                tellus. Ullamcorper arcu id pretium sapien proin integer nisl.
                Felis orci diam odio.
              </p>
              <p className="mb-5">
                Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
                tellus quam porttitor. Mauris velit euismod elementum arcu neque
                facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
                enim mattis odio in risus nunc.
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className="relative mt-16">
              <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                <ActionButton setSelectedPage={setSelectedPage}>
                  Log in
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Recipes;