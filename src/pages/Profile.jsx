import { useUser } from "../Providers/UserProvider";

const Profile = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      {user && (
        <div>
          <p>{user.userName}</p>
          <p>{user.phnoeNumber}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
