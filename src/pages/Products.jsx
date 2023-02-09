import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Product from "../components/Product";
import { useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";
import Layout from "../Layout/Layout";
import FilterProducts from "../components/FilterProducts";

const Products = () => {
  const [products, setProducts] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [filters, setFilters] = useState({
    product: "",
    cars: [],
    sort: "latest",
    cost: [0, 0],
  });
  const [showedProducts, setShowedProducts] = useState(null);
  const { addToCart } = useCardActions();
  //implement  sort filter
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
      return product.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "cheap") {
      return product.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "mostDiscount") {
      return product.sort((a, b) => b.discount - a.discount);
    }
  };
  //implement price filter
  const priceFilter = (product) => {
    if (filters.cost[1] === 0) {
      product.filter((item) => item.cost >= filters.cost[0]);
    } else {
      product.filter(
        (item) => item.cost >= filters.cost[0] && item.cost <= filters.cost[1]
      );
    }
  };

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
      priceFilter(product)
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

  if (products.loading) return <p>loading</p>;
  if (products.data && products.data.length === 0)
    return <p>no products yet</p>;
  if (products.data && products.data.length > 0) {
    return (
      <Layout>
        <FilterProducts
          products={products}
          filters={filters}
          setFilters={setFilters}
        />
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
