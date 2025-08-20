
export interface TaskType {
    _id:string;
    titulo:string;
    descripcion:string;
    completada:boolean;
   
    
}

// interface TaskTypeFiltrado extends Omit <TaskType,"id" | "completada" | "borrada">

// interface TaskType2{
//     titulo:string;
//     descripcion:string;
// }

// const tarea1:TaskType = {
//     id: 1,
//     titulo:"tarea1",
//     descripcion:"debo hacer esto",
//     completada:false,
//     borrada:false,

// }
// const tarea2:TaskType2 = {
 
//     titulo:"tarea2",
//     descripcion:"debo hacer esto",
   

// }
// const tarea3: Omit <TaskType ,"id" | "completada" | "borrada" > = {
 
//     titulo:"tarea2",
//     descripcion:"debo hacer esto",
   

// }





// console.log(tarea1)
// console.log(tarea2)
// console.log(tarea3)