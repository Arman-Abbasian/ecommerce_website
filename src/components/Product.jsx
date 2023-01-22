const Product = ({ id, image, imgAlt, productName, car }) => {
  return (
    <div>
      <Link to={`/ProductDetail/${id}`}>
        <div class="aspect-w-1 aspect-h-1">
          <img
            src={image}
            alt={imgAlt}
            class="w-full h-full object-center object-contain lg:w-full lg:h-full"
          />
        </div>
      </Link>
      <div>
        <h2>{productName}</h2>
        <div>
          <></>
          <p>{score}</p>
        </div>
        <div>
          <p>{price} $</p>
          <p>{discount}</p>
        </div>
        <button className="px-2 py-4">Add to Basket</button>
      </div>
    </div>
  );
};

export default Product;
