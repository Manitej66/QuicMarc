import React from "react";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const Main = ({ code }) => {
  const [roll, setRoll] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const id = window.location.pathname.split("/")[2];
  let history = useHistory();

  React.useEffect(() => {
    (async () => {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const { usage, quota } = await navigator.storage.estimate();
        console.log(`Using ${usage} out of ${quota} bytes.`);
        if (quota < 120000000) {
          history.push("/error");
        }
      }
    })();
  }, []);

  const post = async () => {
    if (localStorage.getItem(`${id}`) === "done") {
      alert("You already submitted!");
    } else {
      firestore
        .collection("attendance")
        .doc(id)
        .onSnapshot((d) => {
          if (d.exists) {
            if (
              d.data().endsAt >= new Date().getTime() &&
              d.data().present.length < d.data().limit
            ) {
              (async () => {
                setLoad(true);
                const doc = firestore.collection("attendance").doc(id);
                await doc
                  .update({
                    present: arrayUnion(roll),
                  })
                  .then(() => {
                    localStorage.setItem(`${id}`, "done");
                    setLoad(false);
                  })
                  .catch((e) => console.log(e));
              })();
            } else {
              alert("Time ended!");
              setLoad(false);
            }
          }
        });
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-around items-center p-3 font-myfont">
        <input
          className="p-2 border w-3/4 text-center shadow-xs m-4 sm:w-1/2"
          placeholder="Enter your roll"
          maxLength={3}
          onChange={(e) => setRoll(e.target.value)}
        />
        <button
          onClick={post}
          className="py-2 px-4 bg-purple-800 text-white m-4 shadow-sm"
        >
          Present
        </button>
        {load ? <p>Please wait...!</p> : null}
      </div>
    </div>
  );
};

export default Main;
