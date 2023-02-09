import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Product from "../components/Product";
import { useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";
import Layout from "../Layout/Layout";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Slider from '@mui/material/Slider';
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [filters, setFilters] = useState({
    product: "",
    cars: [],
    sort: "latest",
    cost:[0,0]
  });
  const [showedProducts, setShowedProducts] = useState(null);
  const [productoptions, setProductOptions] = useState(null);
  const [carOptions, setCarOptions] = useState(null);
  const [minMaxValue,setMinmaxValue]=useState([1000,4000])

  const { addToCart } = useCardActions();
//set MinMaxValue
useEffect(()=>{
  if(products.data){
   const max= Math.max.apply(Math, products.data.map(function(o) { return o.price; }));
   const min= Math.min.apply(Math, products.data.map(function(o) { return o.price; }))
   setMinmaxValue([min,max])
  }
},[products.data])
  //filter the products.data state und update the showedProducts state
  useEffect(() => {
    if (products.data) {
      let product = products.data;
      if (filters.product === "") {
        product = product;
      } else {
        product = product.filter((item) => item.name === filters.product);
      }
      if (filters.cars == "") {
        product = product;
      } else {
        const cars = filters.cars.map((item) => item.value);
        product = product.filter((item) => cars.includes(item.car));
      }
      sortFilter(product);
      setShowedProducts(product);
    }
  }, [products, filters]);
  //fill the products state in intial loading the page
  useEffect(() => {
    setProducts({
      data: null,
      error: null,
      loading: true,
    });
    http
      .get("/products")
      .then((res) =>
        setProducts({
          data: res.data,
          error: null,
          loading: false,
        })
      )
      .catch((err) => {
        setProducts({
          data: null,
          error: err,
          loading: false,
        });
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    if (products.data) {
      //make unique product name
      let uniqueProductName = products.data.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.place === value.place && t.id === value.id)
      );

      //make unique car name
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

  const sortFilter = (product) => {
    if (filters.sort === "latest") {
      return product.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    } else if (filters.sort === "earliest") {
      return product.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (filters.sort === "expensive") {
      return product;
    } else if (filters.sort === "cheap") {
      return product;
    } else if (filters.sort === "mostDiscount") {
      return product;
    }
  };

  const sortOptions = [
    { id: 1, value: "latest", label: "latest" },
    { id: 2, value: "earliest", label: "earliest" },
    { id: 3, value: "expensive", label: "expensive" },
    { id: 4, value: "cheap", label: "cheap" },
    { id: 5, value: "mostDiscount", label: "most discount" },
  ];

  const changeProductsInput = (value) => {
    setFilters({ ...filters, product: value.value });
  };
  const changeCarsInput = (value) => {
    setFilters({ ...filters, cars: value });
  };
  const changeSortInput = (value) => {
    setFilters({ ...filters, sort: value.value });
  };
  const valuetext=(value)=> {
    return `${value} $`;
  };
  const handleChange=(e)=>{
    setFilters({...filters,cost:e.target.value})
  }
  const animatedComponents = makeAnimated();

  if (products.loading) return <p>loading</p>;
  if (products.data && products.data.length === 0)
    return <p>no products yet</p>;
  if (products.data && products.data.length > 0) {
    return (
      <Layout>
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
        <div className="flex flex-wrap justify-center items-center gap-6 container mx-auto max-w-5xl">
          {showedProducts &&
            showedProducts.map((item) => {
              return (
                <Product
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  imgAlt={item.imgAlt}
                  productName={item.name}
                  score={item.score}
                  price={item.price}
                  discount={item.discount}
                  addToCart={() => addToCart(item)}
                />
              );
            })}
        </div>
      </Layout>
    );
  }
};

export default Products;
