import Select from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import classNames from "classnames";

const FilterProducts = ({ products, filters, setFilters, minMaxValue }) => {
  //porducts option in filter section
  const [productoptions, setProductOptions] = useState(null);
  //cars option in filter section
  const [carOptions, setCarOptions] = useState(null);
  //sort options for sort filter
  const sortOptions = [
    { id: 1, value: "latest", label: "latest" },
    { id: 2, value: "earliest", label: "earliest" },
    { id: 3, value: "expensive", label: "most expensive" },
    { id: 4, value: "cheap", label: "cheapest" },
    { id: 5, value: "mostDiscount", label: "most discount" },
  ];

  //make unique product name for productoptions state
  useEffect(() => {
    if (products.data) {
      let uniqueProductName = products.data.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.place === value.place && t.id === value.id)
      );

      //make unique car name for caroptions state
      let uniqueCarName = products.data.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.place === value.place && t.car === value.car)
      );

      const productoptions = uniqueProductName.map((item) => {
        return { id: item.id, value: item.name, label: item.name };
      });
      setProductOptions([
        { id: 0, value: "", label: "All" },
        ...productoptions,
      ]);

      const caroptions = uniqueCarName.map((item) => {
        return { id: item.id, value: item.car, label: item.car };
      });
      setCarOptions(caroptions);
    }
  }, [products.data]);

  const changeProductsInput = (value) => {
    setFilters({ ...filters, product: value.value });
  };
  const changeCarsInput = (value) => {
    setFilters({ ...filters, cars: value });
  };
  const changeSortInput = (value) => {
    setFilters({ ...filters, sort: value.value });
  };
  const valuetext = (value) => {
    return `${value} $`;
  };
  const handleChange = (e) => {
    setFilters({ ...filters, cost: e.target.value });
  };
  const animatedComponents = makeAnimated();
  return (
    <div className="grid  lg:grid-cols-2  items-center gap-4 mb-12 container mx-auto max-w-sm lg:max-w-xl">
      {productoptions && (
        <Select
          onChange={changeProductsInput}
          placeholder="search product name ..."
          options={productoptions}
          components={animatedComponents}
          className="w-full"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#425664",
              border: state.isFocused
                ? "2px solid #1976d2"
                : "0px solid #1976d2",
              boxShadow: "none",
            }),
            input: (baseStyles, state) => {
              return {
                ...baseStyles,
                color: "white",
              };
            },
            option: (styles, state) => {
              return {
                ...styles,
                color: "#425664",
                ":hover": { backgroundColor: "#425664", color: "white" },
              };
            },
            singleValue: (styles, state) => {
              return {
                ...styles,
                color: "white",
              };
            },
            placeholder: (styles, state) => ({
              ...styles,
              color: "white",
            }),
          }}
        />
      )}
      {sortOptions && (
        <Select
          onChange={changeSortInput}
          placeholder="select sort option ..."
          options={sortOptions}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#425664",
              border: state.isFocused
                ? "2px solid #1976d2"
                : "0px solid #1976d2",
              boxShadow: "none",
            }),
            option: (styles, data) => {
              return {
                ...styles,
                color: "#425664",
                ":hover": { backgroundColor: "#425664", color: "white" },
              };
            },
            input: (baseStyles, state) => {
              return {
                ...baseStyles,
                color: "white",
              };
            },
            placeholder: (styles, state) => ({
              ...styles,
              color: "white",
            }),
            singleValue: (styles, state) => {
              return {
                ...styles,
                color: "white",
              };
            },
          }}
          components={animatedComponents}
        />
      )}
      {carOptions && (
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          onChange={changeCarsInput}
          isMulti
          placeholder="select car name ..."
          options={carOptions}
          className="w-full text-primary_dark_blue"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#425664",
              border: state.isFocused
                ? "2px solid #1976d2"
                : "0px solid #1976d2",
              boxShadow: "none",
            }),
            option: (styles, data) => {
              return {
                ...styles,
                color: "#425664",
                ":hover": { backgroundColor: "#425664", color: "white" },
              };
            },
            input: (baseStyles, state) => {
              return {
                ...baseStyles,
                color: "white",
              };
            },
            placeholder: (styles, state) => ({
              ...styles,
              color: "white",
            }),
            multiValue: (styles, data) => {
              console.log(data);
              return {
                ...styles,
                color: "#425664",
                backgroundColor: "white",
                ":hover": { backgroundColor: "#425664", color: "white" },
              };
            },
            multiValueLabel: (styles, data) => {
              console.log(data);
              return {
                ...styles,
                color: "#425664",
                cursor: "pointer",
                ":hover": { color: "#425664" },
              };
            },
            multiValueRemove: (styles, data) => {
              console.log(data);
              return {
                ...styles,
                cursor: "pointer",
                ":hover": { backgroundColor: "white", color: "#425664" },
              };
            },
          }}
        />
      )}
      <Slider
        value={filters.cost}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={minMaxValue[0]}
        max={minMaxValue[1]}
        aria-label="Restricted values"
        className="text-primary_dark_blue"
      />
    </div>
  );
};

export default FilterProducts;
