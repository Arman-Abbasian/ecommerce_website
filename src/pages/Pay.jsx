import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCard, useCardActions } from "../Providers/CardProvider";
import { useUser } from "../Providers/UserProvider";
import { useState } from "react";
import { toast } from "react-hot-toast";
import http from "../services/httpService";
import { motion, animate, initial, AnimatePresence } from "framer-motion";


var randomNumber = require("random-number");


const Pay = () => {
  const user = useUser();
  const card = useCard();
  const { initialLoading } = useCardActions();
  const navigate = useNavigate();
  const [securityCode,setSecurityCode]=useState(null)
  const [inputValues, setInputValues] = useState({
    cardNumber: "",
    ccv2: "",
    month: "",
    year: "",
    securityCode: "",
    code: "",
    email: "",
  });
  var options = {
    min: 100000,
    max: 1000000,
    integer: true,
  };
  function totalPrice() {
    if (user) {
      return card.reduce(
        (acc, curr) => acc + curr.quantity * curr.reducedPrice,
        0
      );
    }
  }

  useEffect(() => {
    setSecurityCode (randomNumber(options));
    if (!user) {
      navigate("/Login");
    }
  }, []);
  const cardNumber = () => {
    let characters = inputValues.cardNumber;
    const charactersToArray = characters.split("");
    if (charactersToArray.length >= 4 && charactersToArray.length < 8) {
      charactersToArray.splice(4, 0, "-");
    } else if (charactersToArray.length >= 8 && charactersToArray.length < 12) {
      charactersToArray.splice(4, 0, "-");
      charactersToArray.splice(9, 0, "-");
    } else if (characters.length >= 12) {
      charactersToArray.splice(4, 0, "-");
      charactersToArray.splice(9, 0, "-");
      charactersToArray.splice(14, 0, "-");
    }
    return charactersToArray.join("");
  };
  const changeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValues.cardNumber.length < 16) {
      toast.error("card number must be 16 character");
    } else if (inputValues.month.length != 2 || inputValues.year.length != 2) {
      toast.error("month und year must be 2 character");
    } else if (inputValues.securityCode !== securityCode.toString()) {
      toast.error("security code is wrong");
    } else {
      http
        .post("/sales", { card, user: user.id, date: Date() })
        .then((res) => {
          toast.success("pay successfully");
          localStorage.removeItem("card");
          initialLoading();
          navigate("/Products");
        })
        .catch((err) => toast.error(err.message));
    }
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
  return (
    <AnimatePresence>
    <motion.div variants={listVariants}
    initial="initial"
    animate="visible"
    exit="hidden" className="flex flex-col gap-3 container mx-auto max-w-md p-2 relative">
      <div class="aspect-w-8 aspect-h-5">
        <img
          src="/images/card.png"
          alt="credit card"
          className="w-full h-full object-center object-contain"
        />
        <p className="absolute top-36 left-28 font-bold">{cardNumber()}</p>
        <p className="absolute top-[166px] left-28 text-sm">
          {inputValues.ccv2}
        </p>
        <p className="absolute top-[184px] left-28 text-sm">expire date</p>
        <p className="absolute top-[184px] left-52 text-sm">
          {inputValues.month || "00"}/{inputValues.year || "00"}
        </p>
      </div>
      <p>total price : {totalPrice()} $</p>
      <form onSubmit={submitHandler}>
        <div className="w-full mb-4">
          <label className="mb-2 block">card number</label>
          <input
            name="cardNumber"
            onChange={changeHandler}
            maxLength="16"
            minLength="16"
            value={inputValues.cardNumber}
            className="w-full border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block mb-2">ccv2</label>
          <input
            name="ccv2"
            value={inputValues.ccv2}
            onChange={changeHandler}
            className="w-1/3 border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
          />
        </div>
        <div className="w-full mb-4">
          <label className="mb-2 block">exipre date</label>
          <div className="flex justify-center items-center gap-4">
            <div className="flex-1">
              <label className="mb-2 block">year</label>
              <input
                name="year"
                maxLength="2"
                minLength="2"
                value={inputValues.year}
                onChange={changeHandler}
                className="w-full border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block">month</label>
              <input
                name="month"
                maxLength="2"
                minLength="2"
                value={inputValues.month}
                onChange={changeHandler}
                className="w-full border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
              />
            </div>
          </div>
        </div>

        <div className="w-full mb-4 flex justify-center items-center gap-4">
          <div className="flex-1">
            <label className="mb-2 block">security code</label>
            <input
              name="securityCode"
              value={inputValues.securityCode}
              onChange={changeHandler}
              className="w-full border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
            />
          </div>
          {securityCode && 
          <div className="flex-1 self-end flex justify-center items-center bg-primary_dark_blue text-primary_light_gray py-3 rounded h-full">
          <p>{securityCode}</p>
        </div>}
        </div>
        <div className="w-full mb-4">
          <label className="mb-2 block">code</label>
          <input
            name="code"
            value={inputValues.code}
            onChange={changeHandler}
            className="w-1/2 border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
          />
        </div>
        <div className="w-full mb-4">
          <label className="mb-2 block">email</label>
          <input
            type="email"
            name="email"
            value={inputValues.email}
            onChange={changeHandler}
            className="w-full border border-primary_dark_blue focus:bg-transparent rounded focus:outline-none  bg-transparent py-2 px-4"
          />
        </div>
        <button
          className="flex justify-center items-center p-2 rounded bg-primary_dark_blue text-primary_light_gray w-full mt-10"
          type="submit"
        >
          pay
        </button>
      </form>
    </motion.div>
    </AnimatePresence>
  );
};
export default Pay;
