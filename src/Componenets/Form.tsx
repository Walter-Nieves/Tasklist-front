import {useForm} from "react-hook-form"
import { useFormContext } from "../Contexts/FormContext"
import { useTask } from "../Contexts/TaskContext.tsx"

interface DatosForm {
    titulo:string,
    descripcion:string

}

function Form() {

    const {register,handleSubmit,formState:{errors},} = useForm <DatosForm> ();

    const {turnViewForm} = useFormContext();
    const {addTask} = useTask();

    const alEnviar = handleSubmit((data)=>{
        console.log(data)
        addTask(data);
     
        turnViewForm();
    });

  return (
    <div  className="z-10 flex items-center justify-center w-screen h-screen fixed left-0 top-0" >
        {/* sombra */}
        <div className="absolute size-full bg-black/50 -z-10" onClick={turnViewForm}></div>
        <form className="bg-white p-4 w-full max-w-[300px] flex flex-col space-y-2 rounded-xl " onSubmit={alEnviar}>
            <h3 className="text-blue-500 font-bold text-center text-2xl">Nueva tarea</h3>
            <input className="bg-gray-100 px-2 py-1 rounded-lg " type="text" placeholder="Titulo de la tarea " {...register("titulo",{
                required:"Debes llenar este campo",
                minLength:{
                    value:5,
                    message:"El titulo debe tener minimo 5 caracteres"
                },
                maxLength:{
                    value:40,
                    message:"El titulo debe tener maximo 40 caracteres"
                }
            })} />
            {errors.titulo && <span className=" px-2 text-red-500 text">{errors.titulo.message}</span>}
            <textarea className=" bg-gray-100 px-2 py-1 rounded-lg max-h-[50vh] min-h-20" 
             placeholder="Descripcion de la tarea" {...register("descripcion", {
                 required:"Debes llenar este campo",
                minLength:{
                    value:5,
                    message:"El titulo debe tener minimo 5 caracteres"
                },
                maxLength:{
                    value:200,
                    message:"El titulo debe tener maximo 200 caracteres"
                }
            })} ></textarea>
            {errors.descripcion && <span className=" px-2 text-red-500 text">{errors.descripcion.message}</span>}
            <button className="bg-blue-400 rounded-md px-4 py-2 self-center text-white font-bold hover:bg-blue-400/90 transition-colors
            cursor-pointer " type="submit">Agregar</button>
        </form>
    </div>
  )
}

export default Form;