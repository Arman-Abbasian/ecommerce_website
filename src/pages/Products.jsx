import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Product from "../components/Product";
import { useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";
import Layout from "../Layout/Layout";

const Products = () => {
  const [products, setProducts] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const { addToCart } = useCardActions();
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
        <div className="flex flex-wrap justify-center items-center gap-6 container mx-auto max-w-5xl">
          {products.data.map((item) => {
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
