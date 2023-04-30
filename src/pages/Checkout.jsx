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
    if (user) {
      return card.reduce(
        (acc, curr) => acc + curr.quantity * curr.reducedPrice,
        0
      );
    }
  }
  return (
      <div className="container mx-auto max-w-lg">
        <table className="min-w-full text-center rounded mb-8 overflow-hidden">
          <thead className="border-b bg-primary_dark_blue rounded text-primary_light_gray text-sm font-medium">
            <tr className="rounded">
              <th
                scope="col"
                className="px-2 py-1"
              >
                product
              </th>
              <th
                scope="col"
                className="px-6 py-4"
              >
                number
              </th>
              <th
                scope="col"
                className="px-6 py-4"
              >
                cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary_light_gray">
            {card &&
              card.map((item) => (
                <tr key={item.id}>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.quantity * item.reducedPrice} $
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className="mb-4">total: {totalPrice()}</p>
          <Link to={"/Pay"} className="bg-primary_dark_blue px-6 py-2 flex justify-center items-center rounded text-primary_light_gray">pay</Link>
      </div>

  );
};

export default Checkout;
