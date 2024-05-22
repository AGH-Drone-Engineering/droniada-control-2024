import { useEffect, useState } from "react";
import { onSnapshot, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from 'logic/fb';

export default function BigButtonForMarsjańskie() {
  const [isMissionRunning, setIsMissionRunning] = useState(false);

  onSnapshot(collection(db, "marsjanin"), (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setIsMissionRunning(doc.data().mission_state === "running");
    });
  });

  const placeDoc = async () => {
    const toSet = !isMissionRunning;
    setDoc(doc(db, "marsjanin", "main"), {
      mission_state: toSet ? "running" : "landed",
    });
    setIsMissionRunning(toSet);
  }

  return (
    <div style={{ width: "300px", height: "100px" }}>
      <button
        style={{
          display: "block",
          width: "100%",
          padding: "1rem",
          fontSize: "1.5rem",
          backgroundColor: (isMissionRunning ? "red" : "green"),
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer"
        }}
        onClick={() => placeDoc()}
      >
        {isMissionRunning ? "Zatrzymaj misję" : "Rozpocznij misję"}
      </button>
    </div>
  );
}