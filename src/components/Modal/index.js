import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

export default function Modal({ open, onClose, children }) {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <OverlayStyle onClick={onClose} />
      <ModalStyle>
        {children}
      </ModalStyle>
    </>,
    document.getElementById("modal"),
  );
}

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 15rem;
  height: 13rem;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: #f2c84d;
  z-index: 1000;
`;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
