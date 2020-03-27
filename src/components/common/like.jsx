import React from "react";

const Like = props => {
  let classes = "clickable fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i onClick={props.toggleLike} className={classes} aria-hidden="true"></i>
  );
};

export default Like;
