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
        {records &&
          records.length &&
          records.forEach((item) => {
            item.card.map((element) => {
              return (
                <div>
                  <div class="aspect-w-1 aspect-h-1">
                    <img
                      src={element.image}
                      alt={element.imageAlt}
                      class="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>
              );
            });
          })}
    </div>
  );
};

export default Profile;
