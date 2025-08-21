import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
// import { guardarTareas  } from "../data/taskManager";
import type { TaskType } from "../types";
// import dotenv from "dotenv"
// import process from "node:process";



// dotenv.config()
//npm i -D @types/node
interface TaskContextType {
  tasks: TaskType[]
  addTask: (task:Omit <TaskType ,"_id" | "completada" > )=>Promise<void>
  checkTask:(_id:string)=>Promise<void>
  deleteTask:(_id:string)=>Promise<void>
}

const TaskContext = createContext <TaskContextType | undefined> (undefined);
// ReactNode puede ser texto etiquetas html o componenetes
function TaskProvider({ children }:{children: ReactNode}) {
  const [tasks, setTasks] = useState <TaskType[]> ([]);

  useEffect(() => {
    async function fetchTasks() {
      // console.log(process)
      const response = await fetch (import.meta.env.VITE_API+"/task");
      const loadedTasks = await response.json() as TaskType[];
      // const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    }
    fetchTasks();
  }, []);

  const addTask: TaskContextType["addTask"] = async (task) => {

    try {
      const response = await fetch(import.meta.env.VITE_API + "/task" ,{
    method:"POST",
    headers:{
           "Content-Type":"application/json"
           },
           body: JSON.stringify(task)
    } )

    const newTask = await response.json() as TaskType

    const updatedTasks = [...tasks,newTask]
       alert("Tarea agregada con exito");
    setTasks(updatedTasks)
      
    } catch (error) {
      console.error(error)
      alert("Ocurrio un error al agregar la tarea")
      
    }

    // const newTask = {
    //   id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
    //   titulo,
    //   descripcion,
    //   completada: false,
    //   borrada: false,
    // };

    // const updatedTasks = [...tasks, newTask];
    // setTasks(updatedTasks);
    // await guardarTareas (updatedTasks);
  };

  const checkTask: TaskContextType["checkTask"] = async (_id) => {

    try {
       const response = await fetch(import.meta.env.VITE_API + "/task/" + _id ,{
       headers:{
           "Content-Type":"application/json"
           },
           method:"PATCH"
    })
    const checkedTask =  await response.json() as Pick <TaskType, '_id' | 'completada' >
    
    const updatedTasks = [...tasks]
    const searchTaskIndex = updatedTasks.findIndex(task => task._id == checkedTask._id)

    if(searchTaskIndex == -1){
      throw new Error("Error al marcar la tarea")
    }

    updatedTasks[searchTaskIndex].completada = checkedTask.completada

    setTasks(updatedTasks)
    
    // const updatedTask  = tasks.map(task=> task._id == checkedTask._id ? checkedTask : task )
    // setTasks(updatedTask)
    // console.log(checkedTask)
      
    } catch (error) {
      console.error(error)
      alert("Error al marcar la tarea")
    }

    // const existTask = tasks.findIndex((task) => task.id == id);
    // if (existTask == -1) return alert("Error al marcar la tarea");
    // const newTaskList = [...tasks];
    // newTaskList[existTask].completada = !newTaskList[existTask].completada;
    // setTasks(newTaskList);

  };

 const deleteTask: TaskContextType['deleteTask'] = async (_id) => {
        
        try {
            const response = await fetch (import.meta.env.VITE_API + '/task/' + _id , {
                method: 'DELETE'
            })

            const tareaBorrada = await response.json() as Pick <TaskType, "_id">
            console.log(tareaBorrada)

            const updatedTasks = tasks.filter(tarea => tarea._id !== tareaBorrada._id)
            setTasks(updatedTasks)

            // if (!response.ok) {
            //     throw new Error('Error al borrar la tarea')
            // }
            // const tarea = await response.json() as TaskType
            // console.log(tarea)
            // const updatedTasks = tasks.filter(task => task.id !== tarea.id)
        } catch (error) {
            console.error(error)
            alert('No se pudo eliminar la tarea')
        }



        // const index = tasks.findIndex((task) => task.id === id);
        // if(index === -1) return alert("Error al borrar la tarea");
        // const updatedTasks = [...tasks];
        // updatedTasks[index].borrada = true;
        // setTasks(updatedTasks);
        // await guardarTareas(updatedTasks);
    }


    
    // const index = tasks.findIndex((task) => task.id == id);
    // if (index == -1) return alert("Error al marcar la tarea");
    // const updatedTasks = [...tasks];
    // updatedTasks[index].completada = !updatedTasks[index].completada;
    // setTasks(updatedTasks);
    // await guardarTareas(updatedTasks);
 


  return (
    <TaskContext.Provider value={{ tasks, addTask, checkTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error(
      "No puede usar useTask si no estas dentro del TaskProvider"
    );
  return context;
}

export default TaskProvider;


