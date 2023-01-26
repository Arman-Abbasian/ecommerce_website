import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

const Checkout = () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/Login?redirect=Checkout");
    }
  }, []);
  return (
    <div>
      <p>Checkout</p>
      <button>pay</button>
    </div>
  );
};

export default Checkout;
