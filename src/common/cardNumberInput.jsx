const Input = ({ name, formik, label }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center w-full relative">
        <label className="flex w-full" htmlFor={name}>
          {label}
        </label>
        <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
          <input
            className=" w-1/4 rounded-md border-none focus:border-none focus:outline-none flex-1 bg-transparent "
            type="text"
            id={name}
            name={name}
            {...formik.getFieldProps({ name })}
          />
        </div>
      </div>

      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="">{formik.errors[name]}</p>
        )}
      </div>
    </>
  );
};

export default Input;
