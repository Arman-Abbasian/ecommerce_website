import OneBasketItem from "../components/OneBasketItem";
import { useCard } from "../Providers/CardProvider";

const Basket = () => {
  const {data} = useCard();
  console.log(data);
  if (data && data.length > 0) {
    return (
      <div>
        {data.map((item) => (
          <OneBasketItem
            image={item.image}
            imgAlt={item.imgAlt}
            name={item.name}
            quantity={item.quantity}
            reducedPrice={item.reducedPrice}
          />
        ))}
        <div>reciept</div>
      </div>
    );
  }
};

export default Basket;
