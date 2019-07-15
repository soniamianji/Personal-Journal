import React from "react";

export default function AvatarGenerator({ user }) {
  const splitedName = user.split(" ");
  const a = splitedName[0][0].toUpperCase();
  const b = splitedName[splitedName.length - 1][0].toUpperCase();

  return (
    <div className="circleavatar">
      <div className="circleavatar__letterwrapper">
        <span className="circleavatar__firstletter">{a}</span>{" "}
        <span className="circleavatar__secondletter">{b}</span>
      </div>
    </div>
  );
}

//get name
//convert to array
// split by space

//push to array
//first index and last index
//ignore the middle

//const variable
//put them in span
//style it

//test with hardcode
