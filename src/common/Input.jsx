const Input = ({ name, type = "text", formik, logo, label }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center w-full relative">
        <label className="flex w-full" htmlFor={name}>
          {label}
        </label>
        <div className="border border-primary_dark_blue rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
          <span>{logo}</span>
          <input
            className=" w-full rounded-md border-none focus:border-none focus:outline-none flex-1 bg-transparent"
            type={type}
            id={name}
            name={name}
            {...formik.getFieldProps({ name })}
          />
        </div>
      </div>

      <div>
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-red-500">{formik.errors[name]}</p>
        )}
      </div>
    </>
  );
};

export default Input;
