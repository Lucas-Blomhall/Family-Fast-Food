import lucasselfiefffbackground from "@/assets/lucasselfiefffbackground.png";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Footer = ({ setSelectedPage }: Props) => {
  return (
    
    <footer className="bg-primary-100 py-16">
      <section id="footer" className="mx-auto w-5/6 pt-24 pb-32">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Footer)}
      >
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={lucasselfiefffbackground} 
          width="200"/>
          <p className="my-5">
          Lucas Blomhäll.<br></br>
          Född 2002.<br></br>
          KYH Yrkeshögskola.<br></br>
          Fullstack developer.<br></br>
          <br></br>
          Jag tror att dem flesta tycker att jag är en glad och ansvarstagande kille.
          </p>
          <p>© Family Fast-Food All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5"><a href="https://www.linkedin.com/in/lucas-blomh%C3%A4ll-737314228/" className="no-underline hover:underline">My LinkedIn Profile</a></p>
          <p className="my-5"><a href="https://github.com/Lucas-Blomhall?tab=repositories" className="no-underline hover:underline">My Github Profile</a></p>
          <p>Thanks!</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Me</h4>
          <p className="my-5">lucas@gmail.com</p>
          <p>(073)444-5555</p>
        </div>
      </div>
      </motion.div>
    </section>
    </footer>
  );
};

export default Footer;