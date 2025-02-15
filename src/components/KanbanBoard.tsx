
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: { [key: string]: Column } = {
  todo: {
    id: "todo",
    title: "To Do",
    tasks: [],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    tasks: [],
  },
  done: {
    id: "done",
    title: "Done",
    tasks: [],
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      content: newTask,
    };

    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        tasks: [...columns.todo.tasks, task],
      },
    });

    setNewTask("");
    toast.success("Task added successfully!");
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = source.droppableId === destination.droppableId
      ? sourceTasks
      : [...destColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    });

    if (destination.droppableId === "done" && source.droppableId !== "done") {
      toast.success("Task completed!");
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          className="max-w-md"
        />
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <div
              key={column.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <h3 className="font-medium text-slate-800 mb-4">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 min-h-[200px]"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-slate-50 p-3 rounded-lg border border-slate-200"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
