import React from 'react';

function Loading() {
  return (
      <div className='spinner-container absolute inset-0 bg-black grid place-items-center'>
        <div className="spinner-square">
            <div className="square-1 square"></div>
            <div className="square-2 square"></div>
            <div className="square-3 square"></div>
        </div>
      </div>
  )
}

export default Loading;
