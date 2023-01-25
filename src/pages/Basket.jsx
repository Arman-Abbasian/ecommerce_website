import OneBasketItem from "../components/OneBasketItem";
import { useCard } from "../Providers/CardProvider";

const Basket = () => {
  const { data } = useCard();
  console.log(data)
  function productsPrice(){
   return data.reduce(
      (acc, cur) => acc + (cur.price*cur.quantity),
      0
    );
  };
  function yourPrice(){
    return data.reduce(
       (acc, cur) => acc + (cur.reducedPrice*cur.quantity),
       0
     );
   }
  if(data && data.length===0) return <div>no Item in Basket</div>
  if (data && data.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        {data.map((item) => (
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
        <div>
          <div>
            <h3>products costs</h3>
            <p>{productsPrice()} $</p>
          </div>
          <div>
            <h3>your costs</h3>
            <p>{yourPrice()} $</p>
          </div>
          <div>
            <h3>your discount</h3>
            <p>{productsPrice()-yourPrice()} $</p>
          </div>
          <button>check out</button>
        </div>
      </div>
    );
  }
};

export default Basket;
