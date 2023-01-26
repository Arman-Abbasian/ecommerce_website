import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCard, useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";

const ProductDetail = () => {
  const card = useCard();
  const selectedItemId = useParams().id;
  const { addToCart } = useCardActions();
  const [selectedItem, setSelectedItem] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [cardItem, setCardItem] = useState(null);
  useEffect(() => {
    setSelectedItem({ data: null, error: null, loading: true });
    http
      .get(`/products/${selectedItemId}`)
      .then((res) =>
        setSelectedItem({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        setSelectedItem({ data: null, error: err, loading: false });
        toast.error(err.message);
      });
  }, []);

  function findId(item) {
    return card.findIndex((element) => element.id.toString() === item);
  }
  if (selectedItem.loading) return <p>loading</p>;
  if (selectedItem.data && card) {
    return (
      <div className="flex flex-col">
        <div className="flex-1">image</div>
        <div>
          <p>{selectedItem.data.name}</p>
          <p>{selectedItem.data.car}</p>
          <p>{selectedItem.data.price} $</p>
          <p>{selectedItem.data.discount} %</p>
          <p>{selectedItem.data.reducedPrice}$</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In modi
            enim corporis soluta eius maiores similique ipsam doloremque fugiat,
            fuga, voluptates quae excepturi repudiandae velit amet perferendis
            dolores maxime cupiditate.
          </p>
          <div className="flex gap-2"></div>
          <button
            disabled={findId(selectedItemId) >= 0 ? true : false}
            className={`p-2 rounded bg-gray-600 ${
              findId(selectedItemId) >= 0
                ? "cursor-not-allowed bg-opacity-40 disabled"
                : "cursor-pointer"
            } `}
            onClick={() => addToCart(selectedItem.data)}
          >
            {findId(selectedItemId) >= 0 ? "Added in cart" : "Add to basket"}
          </button>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
