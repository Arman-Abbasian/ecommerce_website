import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../Providers/UserProvider";

const Profile = () => {
  const [records, setRecords] = useState(null);
  const user = useUser();
  console.log(user);
  useEffect(() => {
    axios
      .get(`/sales?user=${user.id}`)
      .then((res) => setRecords(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  return (
    <div>
      {user && (
        <div>
          <p>{user.userName}</p>
          <p>{user.phnoeNumber}</p>
          <p>{user.email}</p>
        </div>
      )}
      <div>
        {records &&
          records.length &&
          records.map((item, index) => {
            return (
              <div key={index}>
                {/*date*/}
                <h2>date: {item.date}</h2>
                {/*products*/}
                <div className="flex items-center gap-5">
                  {item.card.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-primary_dark_blue p-2 rounded"
                      >
                        <div class="aspect-w-1 aspect-h-1">
                          <img
                            src={element.image}
                            alt={element.imageAlt}
                            class="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="flex gap-3">
                          <p className="text-primary_light_gray">
                            {element.name}
                          </p>
                          <p className="w-5 h-5 rounded-full bg-primary_cream flex justify-center items-center p-2">
                            {element.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/*total price*/}
                <div className="flex justify-end items-center gap-5">
                  <p>total price: {item.card.reduce((acc, curr) => acc + (curr.quantity *curr.reducedPrice) , 0)}</p>
                  <p>total discount: {item.card.reduce((acc, curr) => acc + (curr.quantity *curr.discount) , 0)}</p>
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
