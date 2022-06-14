import React from 'react';
import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "../../utils/items";
import "./../UI/Todo.css";
import TodoResults from "./TodoResults";
const TodoList = (props) => {
  const [ITEMS, setItems] = useState(props.Data)
  const [cards, setCards] = useState(ITEMS)
  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0]
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )
  useEffect(() => {
    setCards(props.Data)
  }, [props.Data])
  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cards, setCards],
  )

  useEffect(() => {
    props.onUpdate(cards)
  }, [cards])

  useEffect(() => {
    const str = localStorage.getItem('test')
    const parseObj = JSON.parse(str)
    props.onUpdate(parseObj)
    setCards(parseObj)
  }, [])

  useEffect(() => {
    const jsonObj = JSON.stringify(props.Data)
    localStorage.setItem('test', jsonObj)
  }, [props.Data])

  const [, drop] = useDrop(() => ({ accept: ItemType.CARD }))
  const btns = document.getElementsByClassName("Checked-btns");
  const [checkState, setCheckState] = useState("All");
  const [Datalen, setDataLen] = useState(0);
  const CheckLen = () => {
    const GetLen = props.Data.filter((card) => {
      return card.state === "Complete";
    });
    setDataLen(GetLen.length);
  };

  const onAll = () => {
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.color = "hsl(236, 9%, 61%)";
    }
    btns[0].style.color = "hsl(220, 98%, 61%)";
    setCheckState("All");
  };

  const onActive = () => {
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.color = "hsl(236, 9%, 61%)";
    }
    btns[1].style.color = "hsl(220, 98%, 61%)";
    setCheckState("Active");
    setItems(props.Data)
  };
  const onComplete = () => {
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.color = "hsl(236, 9%, 61%)";
    }
    btns[2].style.color = "hsl(220, 98%, 61%)";
    setCheckState("Complete");
  };
  const onClear = () => {
    setDataLen(0);
    props.onClearComplete();
  };
  return (
    <ul className="UserResults">
        <div className="UserDrop" ref={drop}>
          {props.Data.length === 0 ? (
            <TodoResults
              value={"There are Nothing Here"}
              moveCard={moveCard}
              findCard={findCard}
              id={"arsa"}
            />
          ) : checkState === "All" ? (
            cards.map((card) => {
              return (
                <TodoResults
                  value={card.value}
                  state={card.state}
                  id={`${card.id}`}
                  key={card.id}
                  checkState={props.onCheckState}
                  CheckLen={CheckLen}
                  Delete={props.onDelete}
                  moveCard={moveCard}
                  findCard={findCard}
                />
              );
            })
          ) : checkState === "Active" ? (
            cards.map((card) => {
              return card.state === "Active" ? (
                <TodoResults
                  value={card.value}
                  state={card.state}
                  id={card.id}
                  key={card.id}
                  checkState={props.onCheckState}
                  CheckLen={CheckLen}
                  Delete={props.onDelete}
                  moveCard={moveCard}
                  findCard={findCard}
                />
              ) : (
                console.log("Error")
              );
            })
          ) : checkState === "Complete" ? (
            props.Data.map((card) => {
              return card.state === "Complete" ? (
                <TodoResults
                  value={card.value}
                  state={card.state}
                  id={card.id}
                  key={card.id}
                  checkState={props.onCheckState}
                  CheckLen={CheckLen}
                  Delete={props.onDelete}
                  moveCard={moveCard}
                  findCard={findCard}
                />
              ) : (
                console.log("Error")
              );
            })
          ) : (
            console.log("Error")
          )}
        </div>
      <div className="active-states">
        <p>{props.Data.length - Datalen} items left</p>
        <div className="check-btns">
          <button className="Checked-btns" onClick={onAll}>
            All
          </button>
          <button className="Checked-btns" onClick={onActive}>
            Active
          </button>
          <button className="Checked-btns" onClick={onComplete}>
            Completed
          </button>
        </div>
        <button onClick={onClear}>Clear Completed</button>
      </div>
    </ul>
  );
};
export default TodoList;
