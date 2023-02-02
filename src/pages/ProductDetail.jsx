import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCard, useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

const ProductDetail = () => {
  const card = useCard();
  console.log(card);
  const selectedItemId = useParams().id;
  const { addToCart, initialLoading } = useCardActions();
  const [selectedItem, setSelectedItem] = useState({
    data: null,
    error: null,
    loading: false,
  });
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
  useEffect(() => {
    initialLoading();
  }, []);

  function findId(item) {
    return card.findIndex((element) => element.id.toString() === item);
  }
  if (selectedItem.loading) return <p>loading</p>;
  if (selectedItem.data && card) {
    return (
      <div className="flex flex-col">
        {/* image section */}
        <div className="sm:hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div class="aspect-w-3 aspect-h-2">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  class="w-full h-full object-center object-contain"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="aspect-w-3 aspect-h-2">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  class="w-full h-full object-center object-contain"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="aspect-w-3 aspect-h-2">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  class="w-full h-full object-center object-contain"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* product detail */}
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
