import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCard } from "../Providers/CardProvider";
import { useUser } from "../Providers/UserProvider";

const Pay = () => {
  const user = useUser();
  const card = useCard();
  const navigate = useNavigate();
  function totalPrice() {
    if(user){
    return card.reduce(
      (acc, curr) => acc + curr.quantity * curr.reducedPrice,
      0
    );
  }
  }
  
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, []);
  return <div>
    
  </div>;
};

export default Pay;
