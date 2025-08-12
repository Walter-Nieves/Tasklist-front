import { useState } from "react";
import type { TaskType } from "../types";
import { useTask } from "../Contexts/TaskContext.tsx";

interface CheckBoxProps{
    completeHook:{
        completada:boolean;
        turnComplete:() => void;
    }
}

const CheckBox = ({ completeHook: { completada, turnComplete } }:CheckBoxProps) => {
  // const [active, setActive] = useState(false);

  return (
    <div
      className="w-10 aspect-square bg-blue-100 flex border-2  border-blue-300 
        rounded-md cursor-pointer justify-center items-center overflow-hidden select-none "
      onClick={turnComplete}
    >
      {completada && (
        <img
          src="public/IMAGENES/check.svg"
          alt="check"
          className="w-full bg-blue-300"
        />
      )}
    </div>
  );
};

interface TaskProps{
    tareaProp:TaskType
}

function Task({ tareaProp: { titulo, descripcion, completada, id } }:TaskProps) {
    // console.log(id)

  const [more, setMore] = useState(false);
  // const [completed,setCompleted] = useState(completada);
  const { checkTask, deleteTask } = useTask();

  const turnComplete = () => {
    // setCompleted(!completed)
    checkTask(id);
  };

  const copyTask = async () => {
    const copiable = `${titulo}:\n ${descripcion}`;

    try {
      await navigator.clipboard.writeText(copiable);
      alert("Texto copiadeo en el portapapeles");
    } catch (error) {
        console.log(error);
      alert("Ocurrio un error al copiar en el portapapeles");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 space-x-4 items-center rounded-lg flex">
      <CheckBox completeHook={{ completada, turnComplete }} />

      <div
        className={`${
          completada ? "line-through opacity-50" : ""
        } flex flex-col w-full bg-red-200 select-none cursor-pointer`}
        onClick={() => setMore(!more)}
      >
        <span className="font-bold text-xl">{titulo} </span>
        <p className={`text-sm ${more ? "line-clamp-none" : "line-clamp-2"}`}>
          {descripcion}{" "}
        </p>
      </div>
      <button
        onClick={() => deleteTask(id)}
        className="w-10 p-1 aspect-square cursor-pointer bg-blue-100 border-2 border-blue-300 flex
      justify-center items-center rounded-md select-none  "
        type="button"
      >
        <img src="public/IMAGENES/trash3-fill.svg" alt="borrar" />
      </button>
      <button
        onClick={copyTask}
        className="w-10 p-1 aspect-square cursor-pointer bg-blue-100 border-2 border-blue-300 flex
      justify-center items-center rounded-md select-none  "
        type="button"
      >
        <img src="public/IMAGENES/clipboard-check-fill.svg" alt="copiar" />
      </button>
    </div>
  );
}

export default Task;

