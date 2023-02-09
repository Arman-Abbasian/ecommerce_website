import Select from "react-select";
import makeAnimated from "react-select/animated";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";

const FilterProducts = ({ products, filters, setFilters }) => {
  //porducts option in filter section
  const [productoptions, setProductOptions] = useState(null);
  //cars option in filter section
  const [carOptions, setCarOptions] = useState(null);
  //max and min product's cost in filter section
  const [minMaxValue, setMinmaxValue] = useState([1000, 4000]);
  //sort options for sort filter
  const sortOptions = [
    { id: 1, value: "latest", label: "latest" },
    { id: 2, value: "earliest", label: "earliest" },
    { id: 3, value: "expensive", label: "most expensive" },
    { id: 4, value: "cheap", label: "cheapest" },
    { id: 5, value: "mostDiscount", label: "most discount" },
  ];
  //set MinMaxValue
  useEffect(() => {
    if (products.data) {
      const max = Math.max.apply(
        Math,
        products.data.map(function (o) {
          return o.price;
        })
      );
      const min = Math.min.apply(
        Math,
        products.data.map(function (o) {
          return o.price;
        })
      );
      setMinmaxValue([min, max]);
    }
  }, [products.data]);

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
    <div className="flex flex-col lg:flex-row  items-center gap-2 mb-2 container mx-auto max-w-sm lg:max-w-xl">
      {productoptions && (
        <Select
          onChange={changeProductsInput}
          placeholder="search product name ..."
          options={productoptions}
          className="w-full"
        />
      )}
      {sortOptions && (
        <Select
          onChange={changeSortInput}
          placeholder="select sort option ..."
          options={sortOptions}
          className="w-full"
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
          className="w-full bg-transparent"
        />
      )}
      <Slider
        value={filters.cost}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={minMaxValue[0]}
        max={minMaxValue[1]}
        name="costRange"
      />
    </div>
  );
};

export default FilterProducts;
