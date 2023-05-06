import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Product from "../components/Product";
import { useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";
import Layout from "../Layout/Layout";
import FilterProducts from "../components/FilterProducts";
import { motion, animate, initial, AnimatePresence } from "framer-motion";

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
  //max and min product's cost in filter section
  const [minMaxValue, setMinmaxValue] = useState([1000, 4000]);
  const { addToCart } = useCardActions();

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
      setFilters({ ...filters, cost: [min, max] });
    }
  }, [products.data]);

  //implement product filter
  const productFilter = (product) => {
    if (filters.product === "") {
      return product;
    } else {
      return product.filter((item) => item.name === filters.product);
    }
  };
  //implement  car filter
  const carFilter = (product) => {
    if (filters.cars == "") {
      return product;
    } else {
      const cars = filters.cars.map((item) => item.value);
      return product.filter((item) => cars.includes(item.car));
    }
  };
  //implement  sort filter
  const sortFilter = (product) => {
    if (filters.sort === "latest") {
      product.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filters.sort === "earliest") {
      product.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filters.sort === "expensive") {
      product.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "cheap") {
      product.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "mostDiscount") {
      product.sort((a, b) => b.discount - a.discount);
    }
    return product;
  };
  //implement price filter
  const priceFilter = (product) => {
    if (filters.cost[1] === 0) {
      return product.filter((item) => item.price >= filters.cost[0]);
    } else {
      return product.filter(
        (item) => item.price >= filters.cost[0] && item.price <= filters.cost[1]
      );
    }
  };

  //filter the products.data state und update the showedProducts state
  useEffect(() => {
    if (products.data) {
      let product = products.data;
      console.log(filters.sort);
      product = productFilter(product);
      console.log(product);
      product = carFilter(product);
      console.log(product);
      product = sortFilter(product);
      product = priceFilter(product);
      console.log(product);
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
      .get(
        "https://my-json-server.typicode.com/Arman-Abbasian/ecommerce_website_DB/products"
      )
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

  if (products.loading) return <p>loading</p>;
  if (showedProducts && showedProducts.length === 0)
    return (
      <Layout>
        <p className="flex flex-wrap justify-center items-center gap-6 container mx-auto max-w-5xl">
          no products
        </p>
      </Layout>
    );
  if (showedProducts && showedProducts.length > 0) {
    return (
      <Layout>
        <AnimatePresence>
          <motion.div
            variants={listVariants}
            initial="initial"
            animate="visible"
            exit="hidden"
          >
            <FilterProducts
              products={products}
              filters={filters}
              setFilters={setFilters}
              minMaxValue={minMaxValue}
            />
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-wrap justify-center items-center gap-6 container mx-auto max-w-5xl"
            >
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
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Layout>
    );
  }
};

export default Products;
