import React from 'react'
import { useState } from 'react';

const Button = (value) => {

    const [buttonText, setButtonText] = useState('Add');

setButtonText(value);


  return (
    <div>
      {/* <button>{buttonText}</button> */}
    </div>
  )
}

export default Button
