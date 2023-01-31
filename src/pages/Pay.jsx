import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCard, useCardActions } from "../Providers/CardProvider";
import { useUser } from "../Providers/UserProvider";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import http from "../services/httpService";

const Pay = () => {
  const user = useUser();
  const card = useCard();
  const { initialLoading } = useCardActions();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    cardNumber: "",
    ccv2: "",
    month: "",
    year: "",
    securityCode: "",
    code: "",
    email: "",
  });
  function totalPrice() {
    if (user) {
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
  const cardNumberchangeHandler = (e) => {
    if (
      e.target.value.length === 4 ||
      e.target.value.length === 9 ||
      e.target.value.length === 14
    ) {
      e.target.value += "-";
    }
    setInputValues({ ...inputValues, cardNumber: e.target.value });
  };
  const changeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValues.cardNumber.length < 19) {
      toast.error("card number must be 16 character");
    } else if (inputValues.month.length != 2 || inputValues.year.length != 2) {
      toast.error("month und year must be 2 character");
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
  return (
    <div className="flex flex-col gap-3 container mx-auto max-w-md p-2">
      <p>total price : {totalPrice()}</p>
      <form onSubmit={submitHandler}>
        <div className="w-full">
          <label className="mb-2 block">card number</label>
          <input
            name="cardNumber"
            onChange={cardNumberchangeHandler}
            maxLength="19"
            minLength="19"
            value={inputValues.cardNumber}
            className="border w-full"
          />
        </div>

        <div className="w-full">
          <label>ccv2</label>
          <input
            name="ccv2"
            value={inputValues.ccv2}
            onChange={changeHandler}
            className="border w-full"
          />
        </div>
        <div>
          <label className="mb-2 block text-center">exipre date</label>
          <div className="flex justify-center items-center gap-4">
            <div>
              <label className="mb-2 block">year</label>
              <input
                name="year"
                maxLength="2"
                minLength="2"
                value={inputValues.year}
                onChange={changeHandler}
                className="border"
              />
            </div>
            <div>
              <label className="mb-2 block">month</label>
              <input
                name="month"
                maxLength="2"
                minLength="2"
                value={inputValues.month}
                onChange={changeHandler}
                className="border"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block">security code</label>
          <input
            name="securityCode"
            value={inputValues.securityCode}
            onChange={changeHandler}
            className="border"
          />
        </div>
        <div>
          <label className="mb-2 block">code</label>
          <input
            name="code"
            value={inputValues.code}
            onChange={changeHandler}
            className="border"
          />
        </div>
        <div>
          <label className="mb-2 email">email</label>
          <input
            type="email"
            name="email"
            value={inputValues.email}
            onChange={changeHandler}
            className="border"
          />
        </div>
        <button className="bg-red-500" type="submit">
          pay
        </button>
      </form>
    </div>
  );
};
export default Pay;
