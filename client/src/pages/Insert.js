/* eslint-disable react/prop-types */
import React from "react";
import WrappedInputMusic from "../components/InputMusic";

const Insert = props => {
  const insertMusic = music => {
    props.insertMusic(music);
  };
  return (
    <div>
      <WrappedInputMusic
        insertMusic={insertMusic}
        currentUser={props.currentUser}
      />
    </div>
  );
};

export default Insert;
