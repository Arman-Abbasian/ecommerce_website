import { Link } from "react-router-dom";
import OneBasketItem from "../components/OneBasketItem";
import Layout from "../Layout/Layout";
import { useCard } from "../Providers/CardProvider";

const Basket = () => {
  const card = useCard();
  console.log(card);
  function productsPrice() {
    return card.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }
  function yourPrice() {
    return card.reduce((acc, cur) => acc + cur.reducedPrice * cur.quantity, 0);
  }
  if (card && card.length === 0) return <Layout><div className="text-center container mx-auto max-w-5xl text-primary_dark_blue text-2xl  text-shadow-primary">no Item in Basket</div></Layout>;
  if (card && card.length > 0) {
    return (
      <Layout>
      <div className="flex flex-col gap-4 container mx-auto max-w-lg">
        <div className="mb-20 flex flex-col gap-2">
          {card.map((item) => (
            <OneBasketItem
              key={item.id}
              image={item.image}
              imgAlt={item.imgAlt}
              name={item.name}
              quantity={item.quantity}
              reducedPrice={item.reducedPrice}
              item={item}
            />
          ))}
        </div>
        <div className="border border-primary_dark_blue p-2 rounded">
          <div className="flex justify-between mb-2">
            <h3>products costs</h3>
            <p>{productsPrice()} $</p>
          </div>
          <div className="flex justify-between mb-2">
            <h3>your costs</h3>
            <p>{yourPrice()} $</p>
          </div>
          <div className="flex justify-between mb-8">
            <h3>your discount</h3>
            <p>{productsPrice() - yourPrice()} $</p>
          </div>
          <Link
            to="/Login?redirect=Checkout"
            className="bg-primary_dark_blue px-2 py-1 rounded flex justify-center items-center"
          >
            check out
          </Link>
        </div>
      </div>
      </Layout>
    );
  }
};

export default Basket;
