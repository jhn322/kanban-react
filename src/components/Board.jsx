import { useState } from "react";
import { useColumns } from "../components/ColumnContext";
import { useLocation } from "react-router-dom";
import Column from "./Column";
import CreateTask from "./CreateTask";

const Board = () => {
  const { columns, setColumns } = useColumns();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = ({ title, text }) => {
    const newColumns = [...columns];
    const todoColumnIndex = newColumns.findIndex(
      (column) => column.title.toLowerCase() === "to do"
    );
    if (todoColumnIndex !== -1) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}`;

      newColumns[todoColumnIndex].cards.push({
        title,
        text,
        creationDate: formattedDate,
      });
      setColumns(newColumns);
    }
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  // Extract the page from the URL
  const page = location.pathname.substring(1);

  // Filter columns based on the route
  const filteredColumns =
    page === ""
      ? columns
      : columns.filter(
          (column) =>
            column.title.toLowerCase() === page.toLowerCase() ||
            column.title.toLowerCase().replace(" ", "") === page.toLowerCase()
        );

  return (
    <div className="board">
      {filteredColumns.map((column, index) => (
        <Column
          key={index}
          title={column.title}
          cards={column.cards}
          isToDo={column.title.toLowerCase() === "to do"}
          onAddTask={handleAddTask}
        />
      ))}
      {isModalOpen && (
        <CreateTask
          onClose={() => setIsModalOpen(false)}
          onAdd={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Board;
