import { useState } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrash, faEdit, faCheckCircle);

function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const addItem = () => {
    if (isEdit) {
      const newArray = [...items].map((listItem) => {
        if (listItem.id === isEdit.id) {
          listItem.value = value;
        }

        return listItem;
      });
      setItems(newArray);
      setValue("");
    } else {
      if (!value) {
        alert("enter an item");
        return;
      }
      const item = {
        id: Math.floor(Math.random() * 1000),
        value: value,
      };

      setItems((oldList) => [...oldList, item]);
      setValue("");
    }

    setIsEdit("");
  };

  // const completeHendler = () => {
  //   setItems(
  //     items.map((item) => {
  //       if (item.id === item.value) {
  //         return {
  //           ...item,
  //           completed: !item.completed,
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };

  const deleteItem = (id) => {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  };

  const edit = (item) => {
    setIsEdit(item);
    setValue(item.value);
  };

  return (
    <div className="App">
      <h1>What's the plan for today?</h1>
      <form id="to-do-form" onSubmit={onSubmit}>
        <input
          className="to-do-form"
          type="text"
          placeholder="Add an item"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button onClick={() => addItem()} type="submit">
          Add
        </button>
        <div>
          {items.map((item) => {
            return (
              <div className="list" key={item.id}>
                <p>
                  {item.value}
                  <span>
                    <FontAwesomeIcon
                      className={`faicons ${item.completed ? "completed" : ""}`}
                      icon="fas fa-circle-check"
                      // onClick={completeHendler}
                    />
                    <FontAwesomeIcon
                      className="faicons"
                      icon="fas fa-edit  "
                      onClick={() => edit(item)}
                    />
                    <FontAwesomeIcon
                      className="faicons"
                      icon="fas fa-trash  "
                      onClick={() => deleteItem(item.id)}
                    />
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default App;
