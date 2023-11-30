import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {
  return (
    <div className={'Head' + (props.title ? " " : "Header")}>
      {props.title ? (
        <h1>{props.title}</h1>
      ) : (
      <div className="Head">
        <h1>{props.Header}</h1>
        <button className="Head-btn" onClick={()=>props.setOpenModal(false)}>Закрыть</button>
      </div>
      )}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  Header: PropTypes.node,
  setOpenModal: PropTypes.func,
};

export default React.memo(Head);
