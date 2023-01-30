import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCard } from "../Providers/CardProvider";
import { useUser } from "../Providers/UserProvider";

const Checkout = () => {
  const user = useUser();
  const card = useCard();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/Login?redirect=Checkout");
    }
  }, []);
  function totalPrice() {
    if(user){
    return card.reduce(
      (acc, curr) => acc + curr.quantity * curr.reducedPrice,
      0
    );
  }
  }
  return (
    <div>
      <div className="overflow-hidden">
        <table className="min-w-full text-center">
          <thead className="border-b bg-gray-800">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-white px-6 py-4"
              >
                product
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-white px-6 py-4"
              >
                number
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-white px-6 py-4"
              >
                cost
              </th>
            </tr>
          </thead>
          <tbody>
            {card &&
              card.map((item) => (
                <tr key={item.id} className="bg-white border-b">
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.quantity * item.reducedPrice}
                  </td>
                </tr>
              ))}
            <p>total: {totalPrice()}</p>
          </tbody>
        </table>
        <button><Link to={'/Pay'}>pay</Link></button>
      </div>
    </div>
  );
};

export default Checkout;
