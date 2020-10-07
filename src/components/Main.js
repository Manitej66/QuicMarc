import React from "react";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import { useHistory, useParams } from "react-router-dom";
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const Main = () => {
  const [roll, setRoll] = React.useState("");
  const [load, setLoad] = React.useState(false);
  let history = useHistory();
  let { code } = useParams();

  React.useEffect(() => {
    (async () => {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const { quota } = await navigator.storage.estimate();
        if (quota < 120000000) {
          history.push("/error");
        }
      }
    })();
  }, [code, history]);

  const post = async () => {
    if (roll.length !== 3) {
      alert("Enter roll correctly");
    } else {
      if (localStorage.getItem(`${code}`) === "done") {
        alert("You already submitted!");
      } else {
        setLoad(true);
        firestore
          .collection("attendance")
          .doc(code)
          .onSnapshot((d) => {
            if (d.exists) {
              if (
                d.data().endsAt >= new Date().getTime() &&
                d.data().present.length < d.data().limit
              ) {
                (async () => {
                  const doc = firestore.collection("attendance").doc(code);
                  await doc
                    .update({
                      present: arrayUnion(roll),
                    })
                    .then(() => {
                      localStorage.setItem(`${code}`, "done");
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
