// KanbanBoard.js

import React from 'react';
import './KanbanBoard.css'; // Import CSS file for styling

const KanbanBoard = () => {
  // Sample data for the Kanban board
  const columns = {
    Todo: [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }],
    InProgress: [{ id: 3, title: 'Task 3' }],
    Done: [{ id: 4, title: 'Task 4' }],
  };

  return (
    <div className="kanban-board">
     
      <div className="kanban-columns">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="kanban-column">
            <h3>{status}</h3>
            <div className="kanban-tasks">
              {tasks.map((task) => (
                <div key={task.id} className="kanban-task">
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
