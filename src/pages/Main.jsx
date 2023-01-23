import { useEffect } from "react";
import { useCardActions } from "../Providers/CardProvider";
import http from "../services/httpService";

const Main = () => {
  const { initialLoading } = useCardActions();
  useEffect(() => {
    initialLoading();
  }, []);
  return <div>main</div>;
};

export default Main;
