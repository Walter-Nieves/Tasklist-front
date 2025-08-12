import type { TaskType } from "../types";

const  CLAVE_STORAGE = 'tasks';

export async function obtenerTareas(): Promise <TaskType[]> {
    try {
        const datos =localStorage.getItem(CLAVE_STORAGE)
        return datos ? JSON.parse(datos):[]
    } catch (error) {
        console.error(error)
        return[]
    }
}

export async function guardarTareas(tareas:TaskType[]): Promise<void>{
    try {
        localStorage.setItem(CLAVE_STORAGE,JSON.stringify(tareas))
    } catch (error) {
          console.error(error)
    }

}

