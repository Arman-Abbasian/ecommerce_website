import { useEffect } from "react";
import { useUser } from "../Providers/UserProvider";
import http from "../services/httpService";

const Profile = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <p>{user.userName}</p>
      <p>{user.phnoeNumber}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
