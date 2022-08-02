import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
 const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  useEffect(()=>{
    fetch('http://localhost:4000/items')
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      setItems(res)
    })
   },[]) 
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  function handleItemAdd(newItem){
  setItems(items=>[...items,newItem])
  }
  function handleUpdateItem(updatedItem){
    console.log(updatedItem)
    const updatedItems=items.map(item=>{
      if(item.id===updatedItem.id){
        return updatedItem
      }else return item
    })
    setItems(updatedItems)
  }
  function handleUpdateOnDelete(deletedItem){
    setItems(items=>items.filter(item=>item.id !==deletedItem.id))
  }

  return (
    <div className="ShoppingList">
      <ItemForm handleItemAdd={handleItemAdd}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onDeleteItem={handleUpdateOnDelete} onUpdateItem={handleUpdateItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;