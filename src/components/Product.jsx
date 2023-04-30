import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useCard } from "../Providers/CardProvider";
import { motion } from "framer-motion";

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
  const card = useCard();
  function findId(item) {
    if (card) {
      return card.findIndex((element) => element.id === item);
    } else {
      return -1;
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{duration:1}}
    viewport={{ once: true }}
      key={id}
      className="w-64 shadow-lg shadow-primary_dark_blue rounded"
    >
      <Link to={`/ProductDetail/${id}`}>
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={image}
            alt={imgAlt}
            className="w-full h-full object-center object-contain lg:w-full lg:h-full"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <h2>{productName}</h2>
        <div className="flex items-center gap-1">
          <AiFillStar className="fill-yellow-600 stroke-orange-300" />
          <p>{score}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{price} $</p>
          <p className="bg-red-700 px-3 py-1 rounded-full">{discount} %</p>
        </div>
        <button
          disabled={findId(id) >= 0 ? true : false}
          className={`p-2 rounded bg-primary_dark_blue ${
            findId(id) >= 0
              ? "cursor-not-allowed bg-opacity-40"
              : "cursor-pointer"
          } `}
          onClick={addToCart}
        >
          {findId(id) >= 0 ? "Added in Basket" : "Add to basket"}
        </button>
      </div>
    </motion.div>
  );
};

export default Product;
