import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCard, useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdProductionQuantityLimits,
  MdDirectionsCar,
  MdAttachMoney,
} from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import Header from "../Layout/Header";
import { useUser } from "../Providers/UserProvider";
import { motion, animate, initial, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const card = useCard();
  const user = useUser();
  console.log(user);
  const [textAreaInput, setTextAreaInput] = useState("");
  const [comments, setComments] = useState(null);
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
    http
      .get(`/comments?productId=${selectedItemId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, []);
  //manage the input text in text area
  const chaneHandlerTextArea = (e) => {
    setTextAreaInput(e.target.value);
  };
  //framer-motion
  const listVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4,
        duration: 1.6,
        when: "beforeChildren",
      },
    },
    hidden: {
      x: "100vw",
      opacity: 0,
      transition: {
        duration: 10,
      },
    },
  };
  //add the comment to comment section
  const addComment = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("please login at first");
    } else {
      http
        .post("/comments", {
          personId: user.id,
          personUserName: user.userName,
          comment: textAreaInput,
          productId: selectedItemId,
        })
        .then((res) => {
          toast.success("comment added successfully");
          setTextAreaInput("");
          http.get(`/comment?productId=${selectedItemId}`).then((res) => {
            setComments(res.data);
          });
        })
        .catch((err) => toast.error(err.message));
    }
  };
  function findId(item) {
    return card.findIndex((element) => element.id.toString() === item);
  }
  if (selectedItem.loading) return <p>loading</p>;
  if (selectedItem.data && card) {
    return (
      <AnimatePresence>
        <motion.div
          variants={listVariants}
          initial="initial"
          animate="visible"
          exit="hidden"
          className="flex flex-col container mx-auto max-w-4xl"
        >
          <Header />
          {/* image section in mobile section */}
          <div className="sm:hidden mb-10">
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
          {/* image section in tablet and upper */}
          <div className="sm:flex flex-col gap-2 hidden mb-10">
            {/* main image */}
            <div class="aspect-w-5 aspect-h-2 md:aspect-w-6 ">
              <img
                src={selectedItem.data.image}
                alt={selectedItem.data.name}
                class="w-full h-full object-center object-contain"
              />
            </div>
            {/* small  image section */}
            <div className="flex items-center gap-4">
              {/* small  image 1 */}
              <div class="aspect-w-4 md:aspect-w-5 lg:aspect-w-6 xl:aspect-w-7 aspect-h-1 flex-1 bg-primary_dark_blue rounded">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  class="w-full h-full object-center object-contain p-1"
                />
              </div>
              {/* small  image 2 */}
              <div class="aspect-w-4 md:aspect-w-5 lg:aspect-w-6 xl:aspect-w-7 aspect-h-1 flex-1 bg-primary_dark_blue rounded">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  class="w-full h-full object-center object-contain p-1"
                />
              </div>
              {/* small  image 3 */}
              <div class="aspect-w-4 md:aspect-w-5 lg:aspect-w-6 xl:aspect-w-7 aspect-h-1 flex-1 bg-primary_dark_blue rounded">
                <img
                  src={selectedItem.data.image}
                  alt={selectedItem.data.name}
                  class="w-full h-full object-center object-contain p-1"
                />
              </div>
            </div>
          </div>
          {/* product detail */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <MdProductionQuantityLimits className="text-primary_light_gray w-6 h-6 rounded-full bg-primary_dark_blue p-1" />
              <p>{selectedItem.data.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdDirectionsCar className="text-primary_light_gray w-6 h-6 rounded-full bg-primary_dark_blue p-1" />
              <p>{selectedItem.data.car}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdAttachMoney className="text-primary_light_gray w-6 h-6 rounded-full bg-primary_dark_blue p-1" />
              <p>{selectedItem.data.price} $</p>
            </div>
            <div className="flex items-center gap-1">
              <CiDiscount1 className="text-primary_light_gray w-6 h-6 rounded-full bg-primary_dark_blue p-1" />
              <p>{selectedItem.data.discount} %</p>
            </div>
            <div className="flex items-center gap-1">
              <MdAttachMoney className="text-primary_light_gray w-6 h-6 rounded-full bg-primary_dark_blue p-1" />
              <p>{selectedItem.data.reducedPrice} $</p>
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In modi
              enim corporis soluta eius maiores similique ipsam doloremque
              fugiat, fuga, voluptates quae excepturi repudiandae velit amet
              perferendis dolores maxime cupiditate.
            </p>
            <button
              disabled={findId(selectedItemId) >= 0 ? true : false}
              className={`p-2 rounded bg-gray-600 mb-8 ${
                findId(selectedItemId) >= 0
                  ? "cursor-not-allowed bg-opacity-40 disabled"
                  : "cursor-pointer"
              } `}
              onClick={() => addToCart(selectedItem.data)}
            >
              {findId(selectedItemId) >= 0 ? "Added in cart" : "Add to basket"}
            </button>
          </div>
          {/* comment section  */}
          {/* product comments */}
          <div>
            {comments &&
              comments.map((item) => {
                return (
                  <div key={item.id} className="mb-2">
                    <p className="mb-2">{item.personUserName}</p>
                    <p className="p-2 bg-primary_light_gray rounded">
                      {item.comment}
                    </p>
                  </div>
                );
              })}
          </div>
          {/* add comment section */}
          <div>
            <form onSubmit={addComment}>
              <textarea
                value={textAreaInput}
                onChange={chaneHandlerTextArea}
                placeholder="add your comment..."
                className="w-full bg-transparent border border-primary_dark_blue rounded px-2 py-1 focus:outline-none"
              ></textarea>
              <input
                type="submit"
                value="Add comment"
                className="bg-primary_dark_blue rounded p-2 cursor-pointer"
              />
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
};

export default ProductDetail;
