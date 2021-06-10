import React, { Component, useRef, useState, useEffect } from "react";
const Toast = (body) => {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  return (
    <>
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </>
  );
};
export default Toast;
