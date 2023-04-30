import { Link, useLocation } from "react-router-dom";
import { BsBasket3 } from "react-icons/bs";
import { useCard, useCardActions } from "../Providers/CardProvider";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useUser } from "../Providers/UserProvider";
import { motion, animate, initial, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const Header = () => {
  const card = useCard();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const { initialLoading } = useCardActions();
  const [activeLink, setActiveLink] = useState("logo");
  const user = useUser();
  const { pathname } = useLocation();
  useEffect(() => {
    initialLoading();
    if(windowSize.current[0] >= 768){
      setShowHam(true)
    }
  }, []);
  //framer motion section
  const [showHam, setShowHam] = useState(false);
  const listVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4,
        duration: 1.6,
        when: "beforeChildren",
      },
    },
    hidden: {
      opacity: 0,
      x: "-100vw",
      transition: {
        duration: 1,
      },
    },
  };

  const item = {
    initial: {
      opacity: 0,
      x: "-100vw",
      transition: {
        duration: 1,
      },
    },
    hidden: { x: "-100vw" },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="max-h-40 sticky top-4 mb-10 flex-initial z-10"
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", duration: 2, stiffness: 4, damping: 1 }}
    >
      <RxHamburgerMenu
        onClick={() => setShowHam(!showHam)}
        className="md:hidden bg-primary_dark_blue rounded cursor-pointer w-10 h-10 p-2 text-3xl"
      />
      <AnimatePresence>
        
        {showHam && (
          <nav className={`h-full  md:block container mx-auto max-w-5xl mb-6 `}>
            <motion.ul
              variants={listVariants}
              initial="initial"
              animate="visible"
              exit="hidden"
              className="flex flex-col md:flex-row md:justify-evenly gap-2 h-full mt-2 bg-primary_dark_blue p-1 rounded"
            >
              <motion.li variants={item} className="w-1/3 md:w-full">
                <Link
                  onClick={() => setActiveLink("logo")}
                  to="/"
                  className={`flex items-center md:justify-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded ${
                    pathname === "/" && "bg-primary_light_gray"
                  }`}
                >
                  <img src="images/logo.webp" alt="logo" className="w-8 h-8" />
                </Link>
              </motion.li>
              <motion.li variants={item} className="w-1/3 md:w-full">
                <Link
                  onClick={() => setActiveLink("login")}
                  to={user ? "/Profile" : "/Login"}
                  className={`flex items-center md:justify-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded ${
                    pathname === "/Login" && "bg-primary_light_gray"
                  }`}
                >
                  {user ? "profile" : "Login"}
                </Link>
              </motion.li>
              <motion.li variants={item} className="w-1/3 md:w-full">
                <Link
                  onClick={() => setActiveLink("products")}
                  to="/Products"
                  className={`flex items-center md:justify-center md:px-8 h-full hover:bg-primary_light_gray p-1 rounded ${
                    pathname === "/Products" && "bg-primary_light_gray"
                  }`}
                >
                  Products
                </Link>
              </motion.li>
              <motion.li variants={item} className="w-1/3 md:w-full relative ">
                <Link
                  onClick={() => setActiveLink("basket")}
                  to="/Basket"
                  className={`flex items-center md:justify-center md:px-8 h-full w-full hover:bg-primary_light_gray p-1 rounded ${
                    pathname === "/Basket" && "bg-primary_light_gray"
                  }`}
                >
                  <BsBasket3 className="w-6 h-6" />
                  <span className="flex justify-center items-center w-5 h-5 rounded-full bg-red-500 -mt-6">
                    {card ? card.length : 0}
                  </span>
                </Link>
              </motion.li>
            </motion.ul>
          </nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
