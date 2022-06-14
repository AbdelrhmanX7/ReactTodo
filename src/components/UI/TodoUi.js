import { React ,useState } from "react";
import "./Todo.css";
import icon_moon from "./../icon-moon.svg";
import icon_sun from "./../icon-sun.svg";
import TodoList from "../TodoList/TodoList";
const TodoUi = (props) => {
  const Check_Border = document.getElementsByClassName('Checked-Border')
  const [Light, setLight] = useState(true);
  const Dark_Light = () => {
    setLight((prev) => !prev);
    props.onLight();
    if (Light) {
      document.querySelector(".UserInput").classList.add("UI_Night");
      document.querySelector(".UserResults").classList.add("UR_Night");
      document.querySelector(".UserDrop").classList.add("UR_Night_Drop");
      document.querySelector('.check-btns').style.backgroundColor = 'hsl(235, 24%, 19%)'
      for(let i = 0; i <Check_Border.length; i++) {
        Check_Border[i].classList.add('Checked-Border-Night')
      }
    } else {
      document.querySelector(".UserInput").classList.remove("UI_Night");
      document.querySelector(".UserResults").classList.remove("UR_Night");
      document.querySelector(".UserDrop").classList.remove("UR_Night_Drop");
      document.querySelector('.check-btns').style.backgroundColor = 'white'
      for(let i = 0; i <Check_Border.length; i++) {
        Check_Border[i].classList.remove('Checked-Border-Night')
      }
    }
  };

  const [Data, SetData] = useState([]);
  const [Value, setValue] = useState("");
  const onSave = (e) => {
    if (Light) {
      for(let i = 0; i <Check_Border.length; i++) {
        Check_Border[i].classList.remove('Checked-Border-Night')
      }
    } else {

      for(let i = 0; i <Check_Border.length; i++) {
        Check_Border[i].classList.add('Checked-Border-Night')
      }
    }
    setValue(e.target.value);
  };

  const onLeft = (e) => {
    if (e.target.value.length === 0) {
    } else {
      SetData([
        { value: Value, state: "Active", id: Math.random().toString() },
        ...Data,
      ]);
    }
    setValue("");
  };


  const update_Data = (e) => {
    SetData(e)
  }


  const onDelete = (AllState) => {
    for (const i in Data) {
      if (Data[i].id === AllState) {
        Data[i].state = "Delete";
      }
    }
    const test = Data.filter((el) => {
      return el.state !== "Delete";
    });
    console.log(test);
    SetData(test);
  };

  const onCheckState = (AllState) => {
    for (const i in Data) {
      if (Data[i].id === AllState) {
        Data[i].state = "Complete";
      }
    }
    SetData(Data)
  };

  const onClearComplete = () => {
    SetData(
      Data.filter((el) => {
        return el.state !== "Complete";
      })
    );
  };
  
  return (
    <div className="continer">
      <div className="continerUser">
        <div className="Themes">
          <h1>TODO</h1>
          <img onClick={Dark_Light} src={Light ? icon_moon : icon_sun} alt="" />
        </div>
        <div className="UserInput">
          <input
            type="text"
            onChange={onSave}
            value={Value}
            onBlur={onLeft}
            placeholder="Create a new todo..."
          />
        </div>
        <TodoList
          Data={Data}
          onCheckState={onCheckState}
          onLeft={onLeft}
          onClearComplete={onClearComplete}
          value={Value}
          onDelete={onDelete}
          onUpdate={update_Data}
        />
      </div>
    </div>
  );
};

export default TodoUi;
