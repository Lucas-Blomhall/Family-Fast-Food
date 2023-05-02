import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
    page: string;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({page, selectedPage, setSelectedPage}: Props) => {                  //Här tar jag bort mellandrum från meny namnen
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
    return(
        <AnchorLink
        className={`${selectedPage === lowerCasePage } ? "text-primary-500" : ""
            transition duration-500 hover:text-primary-300
        `}
        href={`#${lowerCasePage}`}  //här skickar vi in den utan mellanrum
        onClick={() => setSelectedPage(lowerCasePage)}
        >
            {page}
        </AnchorLink>
    )
} 

export default Link