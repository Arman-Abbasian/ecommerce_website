import http from "../services/httpService";
import { createContext, useContext, useReducer, useState } from "react";
import { toast } from "react-hot-toast";

const CardContext=createContext();
const CardContextDispatcher=createContext();
const CardProvider = ({children}) => {
    const [card,setCard]=useState({card:[],error:null,loading:true})
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
        setCard({card:[],error:null,loading:true});
        http.get(`/products`)
        .then(res=>{
            setCard({card:res.data,error:null,loading:false});
        })
        .catch(err=>{
            setCard({card:null,error:err,loading:false});
            toast.error(err.message)
        });
    };
}