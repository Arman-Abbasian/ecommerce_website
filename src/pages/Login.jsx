import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import { toast } from "react-hot-toast";
import http from "../services/httpService";
import { IoMailOpenOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useUser, useUserActions } from "../Providers/UserProvider";
import Layout from "../Layout/Layout";
import { motion, animate, initial, AnimatePresence } from "framer-motion";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
});
const Login = () => {
  const [users, setUsers] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const user = useUser();
  const setUser = useUserActions();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get("redirect");
  console.log(user);
  if (user) {
    navigate(`/${term}`);
  }
  useEffect(() => {
    setUsers({ data: null, error: null, loading: true });
    http
      .get(
        "https://my-json-server.typicode.com/Arman-Abbasian/ecommerce_website_DB/user"
      )
      .then((res) => setUsers({ data: res.data, error: null, loading: false }))
      .catch((err) => {
        toast.error(err.message);
        setUsers({ data: null, error: err, loading: false });
      });
  }, []);

  const onSubmit = (values, { resetForm }) => {
    if (users.data) {
      const item = users.data.find((element) => element.email === values.email);
      if (item) {
        const checkPassword = item.password === values.password;
        if (checkPassword) {
          setUser(item);
          if (term) {
            navigate(`/${term}`);
          } else {
            navigate("/Products");
          }
        } else {
          setLoginError("email or password is wrong");
        }
      } else {
        setLoginError("email or password is wrong");
      }
    }
    resetForm();
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
          className="flex flex-col gap-3 container mx-auto max-w-lg flex-auto"
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 justify-center items-center border border-primary_dark_blue rounded p-2  shadow-[rgba(236,_243,_158,_0.4)_0px_30px_90px]">
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
              <button
                disabled={!formik.isValid}
                className="py-2 px-4  rounded-sm w-full disabled:bg-opacity-60 bg-primary_dark_blue"
                type="submit"
              >
                {formik.isValid ? "Enter" : "please fill all fields"}
              </button>
              {loginError && <p className="text-red-500">{loginError}</p>}
              <Link
                className="text-primary_dark_blue block w-full text-start"
                to={"/Signup"}
              >
                not sign up yet?
              </Link>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};
export default Login;
