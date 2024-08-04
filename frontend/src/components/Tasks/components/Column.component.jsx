import React from 'react';
import { useDrop } from 'react-dnd';
import "./style.css"

const Column = ({ status, children, updateTaskStatus }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => updateTaskStatus(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="task_inside_container" style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>
      {children}
    </div>
  );
};

export default Column;
