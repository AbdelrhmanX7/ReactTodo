import "./../UI/Todo.css";
import icon_check from "./../icon-check.svg";
import icon_cross from "./../icon-cross.svg";
import React from "react";
import { useDrag, useDrop } from 'react-dnd'
import { ItemType } from "../../utils/items";
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const TodoResults = (props) => {
  const id = props.id
  const findCard = props.findCard
  const moveCard = props.moveCard
  const originalIndex = props.findCard(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveCard],
  )


  const [, drop] = useDrop(
    () => ({
      accept: ItemType.CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id)
          moveCard(draggedId, overIndex)
        }
      },
    }),
    [findCard, moveCard],
  )
  const opacity = isDragging ? 0 : 1



  const FindIndex = () => {
    console.log('test')
    props.checkState(props.id);
    props.CheckLen();
  };
  const onDelete = () => {
    props.Delete(props.id)
  }
  return (
    <li ref={(node) => drag(drop(node))} style={{...style, opacity }}>
      <div className="list-check">
        <button className={`Checked Checked-${props.state}`} onClick={FindIndex}>
          <img src={icon_check} alt="" />
          <div className={`Checked-Border`}></div>
        </button>
        <p className={`${props.state}`}>{props.value}</p>
      </div>
      <button onClick={onDelete} className="Deleted">
        <img src={icon_cross} alt="" />
      </button>
    </li>
  );
};
export default TodoResults;
