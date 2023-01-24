import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import { toast } from "react-hot-toast";
import http from "../services/httpService";
import { IoMailOpenOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().required("phone number is required"),
  password: Yup.string().required("password is required"),
});
const Login = () => {
  const [users,setUsers]=useState({data:null,error:null,loading:false});
  useEffect(()=>{
    http.get('/user')
    .then(res=>setUsers({data:null,error:null,loading:false}))
    .catch()
  },[])
  const onSubmit = (values, { resetForm }) => {
    http
      .post(`/users`, values)
      .then((res) => {
        toast.success(`user made successfully`);
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
            className="py-2 px-4 bg-primary_cream rounded-sm w-full disabled:bg-opacity-60"
            type="submit"
          >
            {formik.isValid ? "Add" : "please fill all fields"}
          </button>
          <Link to={"/Signup"}>not sign up yet?</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
