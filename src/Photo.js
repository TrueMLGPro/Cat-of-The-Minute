import React from "react";

const Photo = (props) => {
  return (
    <div>
      <img className="imageCat border-gradient-purple" src={props.url} alt="Cat"/>
    </div>
  );
};

export default Photo;