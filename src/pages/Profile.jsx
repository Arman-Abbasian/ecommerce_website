import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../Layout/Layout";
import { useUser } from "../Providers/UserProvider";
import { motion, animate, initial, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [records, setRecords] = useState(null);
  const user = useUser();
  useEffect(() => {
    axios
      .get(`/sales?user=${user.id}`)
      .then((res) => setRecords(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  //framer-motion
  const listVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4,
        duration: 1.6,
        when: "beforeChildren",
      },
    },
    hidden: {
      x: "100vw",
      opacity: 0,
      transition: {
        duration: 10,
      },
    },
  };
  return (
    <AnimatePresence>
    <Layout>
      <motion.div variants={listVariants} initial="initial"
    animate="visible"
    exit="hidden" className="container mx-auto max-w-5xl">
        {user && (
          <div className="mb-36">
            <p>{user.userName}</p>
            <p>{user.phnoeNumber}</p>
            <p>{user.email}</p>
          </div>
        )}
        <h2 className="bg-primary_dark_blue p-2 rounded text-primary_light_gray inline-block mb-10">
          purchase records
        </h2>
        <div>
          {records &&
            records.length &&
            records.map((item, index) => {
              return (
                <div key={index} className="flex flex-col justify-center gap-4">
                  {/*date*/}
                  <h2>
                    date:{" "}
                    {new Date(item.date).getFullYear() +
                      "/" +
                      new Date(item.date).getMonth() +
                      1 +
                      "/" +
                      new Date(item.date).getDate()}
                  </h2>
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
                    <p>
                      total price:{" "}
                      {item.card.reduce(
                        (acc, curr) => acc + curr.quantity * curr.reducedPrice,
                        0
                      )}
                    </p>
                    <p>
                      total discount:{" "}
                      {item.card.reduce(
                        (acc, curr) => acc + curr.quantity * curr.discount,
                        0
                      )}
                    </p>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
      </motion.div>
    </Layout>
    </AnimatePresence>
  );
};

export default Profile;
