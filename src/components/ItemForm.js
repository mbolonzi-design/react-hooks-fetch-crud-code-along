import React, { useState } from "react";

function ItemForm({ handleItemAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  function handleSubmit(e) {
    e.preventDefault()
    const newItem = {
      name: name,
      category: category,
      isInCart: false
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }
    fetch("http://localhost:4000/items", options)
    .then(r=>r.json())
    .then(newItems=>handleItemAdd(newItems))
    // handleItemAdd(newItem)
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} className="NewItem">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;