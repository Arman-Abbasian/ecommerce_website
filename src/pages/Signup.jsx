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
  phnoeNumber: Yup.string().required("phone number is required"),
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
  const navigate = useNavigate();
  const onSubmit = (values, { resetForm }) => {
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
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="flex flex-col gap-3 container mx-auto max-w-md p-2">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4 justify-center items-center border rounded-sm p-2  shadow-[rgba(236,_243,_158,_0.4)_0px_30px_90px]">
          <Input
            name="userName"
            label="name"
            formik={formik}
            logo={<IoPersonOutline />}
          />
          <Input
            name="phnoeNumber"
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
            className="py-2 px-4 rounded-sm w-full disabled:bg-opacity-60"
            type="submit"
          >
            {formik.isValid ? "Add" : "please fill all fields"}
          </button>
          <Link to={"/Login"}>already login?</Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;
