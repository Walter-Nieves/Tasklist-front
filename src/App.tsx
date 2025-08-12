

import Task from "./Componenets/Task";
import { useTask } from "./Contexts/TaskContext.tsx";
import Add from "./Componenets/Add.tsx";

// import datos from "/src/data/datos.js";

function App() {
  const { tasks } = useTask();

  return (
    <div className="p-10 flex flex-col space-y-6 ">
      <h1 className="font-bold text-5xl self-center text-blue-500">TaskList</h1>
      <Add />
      <ul className="flex flex-col space-y-2">
        {tasks.map((tareaDato, index) => {
          // if (!tareaDato.borrada)
            return (
              <li key={index}>
                <Task tareaProp={tareaDato} />
              </li>
            );
        })}
      </ul>
    </div>
  );
}

export default App;
