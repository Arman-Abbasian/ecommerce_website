import { Link } from "react-router-dom";
import { BsBasket3 } from "react-icons/bs";
import { useCard } from "../Providers/CardProvider";

const Header = () => {
  const { data } = useCard();
  console.log(data);
  return (
    <div className="bg-gray-200 h-20 sticky top-4">
      <nav className="flex items-center h-full">
        <ul className="flex gap-4">
          <li>
            <Link to="/">logo</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
          <li className="relative">
            <Link to="/Basket">
              <BsBasket3  className="w-6 h-6"/>
            </Link>
            <span className="absolute flex justify-center items-center -top-3 -right-5 w-6 h-6 rounded-full bg-red-600">
              {data.length}
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
