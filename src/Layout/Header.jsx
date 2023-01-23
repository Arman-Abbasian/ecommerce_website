import { Link } from "react-router-dom";
import { BsBasket3 } from "react-icons/bs";
import { useCard } from "../Providers/CardProvider";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Header = () => {
  const { data } = useCard();
  const [showHam, setShowHam] = useState(false);
  return (
    <div className="max-h-40 sticky top-4 mb-10">
      <RxHamburgerMenu
        onClick={() => setShowHam(!showHam)}
        className="md:hidden bg-cyan-300 rounded cursor-pointer w-10 h-10 p-2 text-3xl"
      />
      <nav className={`h-full ${showHam ? "block" : "hidden"}`}>
        <ul className="flex flex-col md:flex-row gap-4 h-full">
          <li className="w-1/3 md:w-full">
            <Link
              to="/"
              className="flex items-center md:px-8 h-full hover:bg-red-500 rounded"
            >
              logo
            </Link>
          </li>
          <li className="w-1/3 md:w-full">
            <Link
              to="/Login"
              className="flex items-center md:px-8 h-full hover:bg-red-500 rounded"
            >
              Login
            </Link>
          </li>
          <li className="w-1/3 md:w-full">
            <Link
              to="/Products"
              className="flex items-center md:px-8 h-full hover:bg-red-500 rounded"
            >
              Products
            </Link>
          </li>
          <li className="w-1/3 md:w-full relative flex items-center md:px-8 h-full hover:bg-red-500 rounded">
            <Link
              to="/Basket"
              className="flex items-center  h-full hover:bg-red-500 rounded"
            >
              <BsBasket3 className="w-6 h-6" />
              <span className="absolute flex justify-center items-center -top-4 right-28 w-5 h-5 rounded-full bg-red-600">
                {data.length}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
