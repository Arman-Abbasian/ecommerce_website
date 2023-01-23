import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCard, useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";

const ProductDetail = () => {
  const card = useCard();
  const { id } = useParams();
  const { addToCart, initialLoading } = useCardActions();
  const [selectedItem, setSelectedItem] = useState({
    data: null,
    error: null,
    loading: false,
  });
  console.log(id);
  useEffect(() => {
    http
      .get(`/products/${id}`)
      .then((res) =>
        setSelectedItem({ data: res.data, error: null, loading: false })
      )
      .catch((err) =>
        setSelectedItem({ data: null, error: err, loading: false })
      );
  }, []);
  useEffect(() => {
    initialLoading();
  }, []);
  function findId(item) {
    console.log(card);
    console.log(card.data.findIndex((element) => element.id === item));
    return card.data.findIndex((element) => element.id === item);
  }

  if (selectedItem.loading) return <p>loading</p>;
  if (selectedItem.data) {
    return (
      <div className="flex">
        <div className="flex-1">image</div>
        <div>
          <p>cover 405</p>
          <p>peugot 405</p>
          <p>1000$</p>
          <p>20%</p>
          <p>800$</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In modi
            enim corporis soluta eius maiores similique ipsam doloremque fugiat,
            fuga, voluptates quae excepturi repudiandae velit amet perferendis
            dolores maxime cupiditate.
          </p>
          <div className="flex gap-2">
            <p>-</p>
            <p>2</p>
            <p>+</p>
          </div>
          <button
            className={`p-2 rounded bg-gray-600 ${
              findId(id) >= 0
                ? "cursor-not-allowed bg-opacity-40"
                : "cursor-pointer"
            } `}
            onClick={() => addToCart(id)}
          >
            {findId(id) >= 0 ? "Added in cart" : "Add to basket"}
          </button>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
