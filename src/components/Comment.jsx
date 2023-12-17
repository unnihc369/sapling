import React from 'react'

const Comment = ({value}) => {
    console.log(value)
  return (
    <div class="card" style={{ width: "18rem" }}>
      {value.el.image&&<img src={value.el.image.imageUrl} class="card-img-top" alt="..." />}
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text">
          {value.el.content}
        </p>
      </div>
    </div>
  );
}

export default Comment