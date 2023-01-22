import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-200">
      <nav>
        <ul>
          <li>
            <Link to="/">logo</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
