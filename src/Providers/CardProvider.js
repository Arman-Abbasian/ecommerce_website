import http from "../services/httpService";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { json } from "react-router-dom";

const CardContext=createContext();
const CardContextDispatcher=createContext();

const CardProvider = ({children}) => {
    const [card,setCard]=useState(null)
;    return ( 
        <CardContext.Provider value={card}>
            <CardContextDispatcher.Provider value={setCard}>
                {children}
            </CardContextDispatcher.Provider>
        </CardContext.Provider>
     );
}
 
export default CardProvider;
export const useCard=()=>useContext(CardContext);
export const useCardActions=()=>{
    const card=useCard();
    const setCard=useContext(CardContextDispatcher);

    //get card
    const initialLoading=()=>{
       setCard (JSON.parse(localStorage.getItem("card"))||[])
    };
    //add card item
    const addToCart=(item)=>{
        try {
            var cloneCard = [...card]
            cloneCard.push({...item,quantity:1});
            localStorage.setItem("card",JSON.stringify(cloneCard));
            toast.success(`${item.name} added to card successfully`)
            initialLoading();
        } catch (error) {
            toast.error(error.message)
        }
    };
    //add quantity to card item
    const addCardItemQuantity=(item)=>{
       const cloneCard=[...card];
      const cardItem= cloneCard.find(element=>element.id===item.id);
      cardItem.quantity++;
      setCard(cloneCard);
      initialLoading();

    };
    //minus quantity to card item
    const minusCardItemQuantity=(item)=>{
        const cloneCard=[...card];
        const cardItem=cloneCard.find(element=>element.id===item.id);
        if(cardItem.quantity===1){
            
      const remaindItems= cloneCard.filter(element=>element.id!==item.id);
      setCard(remaindItems);
      initialLoading();
        }else{
            cardItem.quantity--;
      setCard(cloneCard);
      initialLoading();
        }
       
    };

    return{initialLoading,addToCart,addCardItemQuantity,minusCardItemQuantity}
}