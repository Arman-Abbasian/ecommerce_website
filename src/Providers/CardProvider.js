import http from "../services/httpService";
import { createContext, useContext, useReducer, useState } from "react";
import { toast } from "react-hot-toast";

const CardContext=createContext();
const CardContextDispatcher=createContext();
const CardProvider = ({children}) => {
    const [card,setCard]=useState({data:null,error:null,loading:false})
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
        setCard({data:null,error:null,loading:true});
        http.get(`/card`)
        .then(res=>{
            setCard({data:res.data,error:null,loading:false});
        })
        .catch(err=>{
            setCard({data:null,error:err,loading:false});
            toast.error(err.message)
        });
    };
    //add card item
    const addToCart=(item)=>{
        http.post("/card",{...item,quantity:1})
        .then(res=>{
            initialLoading();
            toast.success(`${item.name} added to card successfully`)
        })
        .catch(err=>toast.error(err.message))
    };
    return{initialLoading,addToCart}
}