import React from 'react';

function Delete(props) {

  return (
    <button id={props.id} onClick={props.onClick}>Delete</button>
  );
}

export default Delete;