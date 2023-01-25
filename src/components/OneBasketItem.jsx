const OneBasketItem = ({ image, imgAlt, name, quantity,reducedPrice }) => {
  return (
    <div className="flex justify-between items-center border rounded p-2">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20">
          <img
            src={image}
            alt={imgAlt}
            class="w-full h-full object-center object-contain"
          />
        </div>
        <p>{name}</p>
      </div>
      <div className="flex items-center gap-4">
            <p>{quantity*reducedPrice}</p>
            <div className="flex items-center border rounded gap-8 p-2">
        <span>-</span>
        <span>{quantity}</span>
        <span>+</span>
      </div>
      </div>
    </div>
  );
};

export default OneBasketItem;
