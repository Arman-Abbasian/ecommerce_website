import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useCardActions } from "../Providers/CardProvider";

const OneBasketItem = ({
  image,
  imgAlt,
  name,
  quantity,
  reducedPrice,
  item,
}) => {
  const { addCardItemQuantity, minusCardItemQuantity } = useCardActions();
  return (
    <div className="flex justify-between items-center border border-primary_dark_blue rounded p-2">
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
        <p>{quantity * reducedPrice} $</p>
        <div className="flex items-center border border-primary_dark_blue rounded gap-4 p-2">
          <span
            className="cursor-pointer w-full h-full bg-primary_dark_blue rounded p-1"
            onClick={() => minusCardItemQuantity(item)}
          >
            {quantity === 1 ? (
              <BiTrash className="text-red-500" />
            ) : (
              <BiMinus className="text-primary_light_gray" />
            )}
          </span>
          <span>{quantity}</span>
          <span
            className="cursor-pointer w-full h-full bg-primary_dark_blue rounded p-1"
            onClick={() => addCardItemQuantity(item)}
          >
            <BiPlus className="text-primary_light_gray" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneBasketItem;
