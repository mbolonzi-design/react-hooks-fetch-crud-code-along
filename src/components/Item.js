import React,{useState} from "react";

function Item({ item, onUpdateItem, onDeleteItem}) {
  function handleCart(){
    const options={
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({isInCart:!item.isInCart})
    }
    fetch(`http://localhost:4000/items/${item.id}`,options)
    .then(r=>r.json())
    .then(updatedItem=>onUpdateItem(updatedItem))
  }
  function handleDelete(){
    const options={method:"DELETE"}
    fetch(`http://localhost:4000/items/${item.id}`,options)
    .then(r=>r.json())
    .then(()=>onDeleteItem(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleCart} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;