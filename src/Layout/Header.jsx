import { Link } from "react-router-dom";
import { BsBasket3 } from "react-icons/bs";
import { useCard, useCardActions } from "../Providers/CardProvider";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useUser } from "../Providers/UserProvider";

const Header = () => {
  const card = useCard();
  const { initialLoading } = useCardActions();
  const [showHam, setShowHam] = useState(false);
  const [activeLink, setActiveLink] = useState("logo");
  const user = useUser();
  useEffect(() => {
    initialLoading();
  }, []);
  return (
    <div className="max-h-40 sticky top-4 mb-10">
      <RxHamburgerMenu
        onClick={() => setShowHam(!showHam)}
        className="md:hidden bg-primary_dark_blue rounded cursor-pointer w-10 h-10 p-2 text-3xl"
      />
      <nav
        className={`h-full ${
          showHam ? "block" : "hidden"
        } md:block container mx-auto max-w-5xl`}
      >
        <ul className="flex flex-col md:flex-row md:justify-evenly gap-2 h-full mt-2 bg-primary_dark_blue p-1 rounded">
          <li className="w-1/3 md:w-full">
            <Link
              onClick={() => setActiveLink("logo")}
              to="/"
              className={`flex items-center md:justify-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded ${
                activeLink === "logo" && "bg-primary_light_gray"
              }`}
            >
              <img src="/images/logo.webp" alt="logo" className="w-8 h-8" />
            </Link>
          </li>
          <li className="w-1/3 md:w-full">
            <Link
              onClick={() => setActiveLink("login")}
              to={user ? "/Profile" : "/Login"}
              className={`flex items-center md:justify-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded ${
                activeLink === "login" && "bg-primary_light_gray"
              }`}
            >
              {user ? "profile" : "Login"}
            </Link>
          </li>
          <li className="w-1/3 md:w-full">
            <Link
              onClick={() => setActiveLink("products")}
              to="/Products"
              className={`flex items-center md:justify-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded ${
                activeLink === "products" && "bg-primary_light_gray"
              }`}
            >
              Products
            </Link>
          </li>
          <li className="w-1/3 md:w-full relative flex items-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded">
            <Link
              onClick={() => setActiveLink("basket")}
              to="/Basket"
              className={`flex items-center gap-1 md:justify-center md:px-8 h-full w-full hover:bg-primary_light_gray p-1 rounded ${
                activeLink === "basket" && "bg-primary_light_gray"
              }`}
            >
              <BsBasket3 className="w-6 h-6" />
              <span className="flex justify-center items-center w-5 h-5 rounded-full bg-red-500 -mt-6">
                {card ? card.length : 0}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
