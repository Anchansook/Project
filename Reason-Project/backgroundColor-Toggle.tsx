import React from 'react'

export default function Follow() {
  let bodyStyle = document.body.style;

  // const ToggleButton = () => {
  //   if (bodyStyle.backgroundColor === 'black') {
  //     bodyStyle.backgroundColor = 'white';
  //   } else {
  //     bodyStyle.backgroundColor = 'black';
  //   }
  // };

  const ToggleButton = () => {
    bodyStyle.backgroundColor === 'black' ?
    bodyStyle.backgroundColor = 'white' : bodyStyle.backgroundColor = 'black';
  };

  return (
    <div>
      <button onClick={ToggleButton}>배경색 토글</button>
    </div>
  )
}
