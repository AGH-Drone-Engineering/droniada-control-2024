import React, { useEffect, useState } from "react";

function calcDay() {
  const startDay = new Date("2024-06-06T00:01:00");
  const now = new Date();
  const diff = now - startDay;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  console.log(now, diff, diff / (1000 * 60 * 60 * 24));
  return day;
}
export default function InspectionDay(props) {
  const [day, setDay] = useState(calcDay());
  const [flyChoosen, setFlyChoosen] = useState(false);
  const cantAuto = <><span class="cheat-info">Jesteśmy jeszcze przed droniadą, nie można automatycznie określić dnia inspekcji.</span></>
  const canAuto = <span class="cheat-info">Jesteśmy już w trakcie droniady, DZIEŃ INSPEKCJI: {calcDay()}</span>
  const ambigFriday = <>{!flyChoosen && <>
    <span class="cheat-info">Jest piątek wybierz lot: </span>
    <button onClick={() => setDay(2) + setFlyChoosen(true)}>Lot (2)</button>
    <button className="short-input" style={{ marginLeft: "20px" }} onClick={() => setDay(3) + setFlyChoosen(true)}>Lot (3)</button></>}
  </>
  let info = cantAuto;
  let calced = calcDay();
  console.log(calced);
  if (calced < 0) {
    info = cantAuto;
  }
  if (calced === 0 || calced === 1 || calced === 3) {
    info = canAuto;
  }
  if (calced === 2) {

    info = ambigFriday;
  }

  useEffect(() => {
    props.daySetter(day);
  }, [day]);

  return (
    <div>
      <h3>Określanie dnia inspekcji</h3>
      {info} <br />
      <select className="short-input" value={day} onChange={e => setDay(e.target.value)}>
        <option value="0">Lot zerowy</option>
        <option value="1">Lot 1</option>
        <option value="2">Lot 2</option>
        <option value="3">Lot 3</option>
      </select>
    </div>
  );
}