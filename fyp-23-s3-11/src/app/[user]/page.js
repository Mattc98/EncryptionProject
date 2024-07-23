"useClient";

import React from 'react'

const user = ({params}) => {
  return (
    <div>
      <h1>Information about {params.user}</h1>
      <p>Hello I'm {params.user}</p>
    </div>
  )
}

export default user
