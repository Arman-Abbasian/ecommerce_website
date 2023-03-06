import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import Input from "../common/Input";
import { toast } from "react-hot-toast";
import http from "../services/httpService";
import {
  IoPersonOutline,
  IoPhonePortraitOutline,
  IoMailOpenOutline,
} from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect } from "react";
import { useState } from "react";
import { motion, animate, initial, AnimatePresence } from "framer-motion";

const initialValues = {
  userName: "",
  phnoeNumber: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};
const passwordRegExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const validationSchema = Yup.object({
  userName: Yup.string().required(`$user name  is required`),
  phoneNumber: Yup.string().required("phone number is required"),
  email: Yup.string().required("phone number is required"),
  password: Yup.string()
    .required("password is required")
    .matches(
      passwordRegExp,
      "at lesat Contain 8 Characters, at least One Lowercase and One Special Case Character"
    ),
  passwordConfirmation: Yup.string()
    .required("password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
const phoneSchema = Yup.string()
  .phone("IN", true, "${path} is invalid")
  .required();

const Signup = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    http
      .get("./user")
      .then((res) => setUsers(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  const onSubmit = (values, { resetForm }) => {
    const duplicateEmail = users.findIndex(
      (item) => item.email.toLowerCase() === values.email.toLowerCase()
    );
    const duplicateMobile = users.findIndex(
      (item) => item.phnoeNumber === values.phoneNumber
    );
    const duplicateMobiles = users.find(
      (item) => item.phnoeNumber === values.phnoeNumber
    );
    if (duplicateEmail >= 0) {
      toast.error("email already existed");
    } else if (duplicateMobile >= 0) {
      console.log(duplicateMobiles);
      toast.error("mobile already existed");
    } else {
      const { userName, email, phnoeNumber, password } = values;
      const newValues = { userName, email, phnoeNumber, password };
      http
        .post(`/user`, newValues)
        .then((res) => {
          toast.success(`user made successfully`);
          navigate("/Login");
        })
        .catch((err) => toast.error(err.message));
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
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
    <Layout>
      <AnimatePresence>
        <motion.div
        variants={listVariants}
          initial="initial"
          animate="visible"
          exit="hidden"
          className="flex flex-col gap-3 container mx-auto max-w-lg"
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 justify-center items-center border border-primary_dark_blue rounded p-2">
              <Input
                name="userName"
                label="name"
                formik={formik}
                logo={<IoPersonOutline />}
              />
              <Input
                name="phoneNumber"
                type="tel"
                label="phone number"
                formik={formik}
                logo={<IoPhonePortraitOutline />}
              />
              <Input
                name="email"
                type="email"
                label="email"
                formik={formik}
                logo={<IoMailOpenOutline />}
              />
              <Input
                name="password"
                type="password"
                label="password"
                formik={formik}
                logo={<RiLockPasswordLine />}
              />
              <Input
                name="passwordConfirmation"
                type="password"
                label="password confirmation"
                formik={formik}
                logo={<RiLockPasswordLine />}
              />

              <button
                disabled={!formik.isValid}
                className="py-2 px-4 rounded-sm w-full disabled:bg-opacity-60 bg-primary_dark_blue"
                type="submit"
              >
                {formik.isValid ? "Add" : "please fill all fields"}
              </button>
              <Link
                to={"/Login"}
                className="text-primary_dark_blue block w-full text-start"
              >
                already login?
              </Link>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};
export default Signup;
