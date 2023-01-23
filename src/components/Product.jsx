import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useCard } from "../Providers/CardProvider";
import { ListItem } from "@mui/material";

const Product = ({
  id,
  image,
  imgAlt,
  productName,
  score,
  price,
  discount,
  addToCart,
}) => {
  const { data } = useCard();
  function findId(item) {
    return data.findIndex((element) => element.id === item);
  }

  return (
    <div key={id} className="border border-red-600 w-64">
      <Link to={`/ProductDetail/${id}`}>
        <div class="aspect-w-1 aspect-h-1">
          <img
            src={image}
            alt={imgAlt}
            class="w-full h-full object-center object-contain lg:w-full lg:h-full"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <h2>{productName}</h2>
        <div className="flex items-center gap-1">
          <AiFillStar className="fill-yellow-500 stroke-orange-300" />
          <p>{score}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{price} $</p>
          <p className="bg-red-700 px-2 py-1 rounded-full">{discount} %</p>
        </div>
        <button
          className={`p-2 rounded bg-gray-600 ${
            findId(id) >= 0
              ? "cursor-not-allowed bg-opacity-40"
              : "cursor-pointer"
          } `}
          onClick={addToCart}
        >
          {findId(id) >= 0 ? "Added in cart" : "Add to basket"}
        </button>
      </div>
    </div>
  );
};

export default Product;
