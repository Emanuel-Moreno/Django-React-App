# Django-React-App
App Web Creada con React y Django

- Empezando el Backend

Crear entorno virtual

pip install django => instalar Django

django-admin startproject nombre_del_proyecto => empezar proyecto en Django

python manage.py startapp nombre_app => iniciar app en Django

python manage.py migrate => ejecutar tabla de datos del project

python manage.py runserver => inicializar el servidor local
 
pip install djangorestframework => instalar framework 

pip install django-cors-headers => indica quien puede conectarse a nuestra backends y comunicarse con otros backends

<
Agregar los frameworks que acabamos de instalar en settings.py - 
INSTALLED_APPS = {'corsheaders','rest_framework'}

MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware'] => colocarlo por encima de CommonMiddleware

CORS_ALLOWED_ORIGINS = [ ] => en el colocamos quien podra hacer peticiones a este servidor => colocarlo al final 
/>

<
Crear en models.py los componentes de la tabla de datos 
 	class Tasks(models.Model):
   	 title = models.CharField(max_length=200)
   	 description = models.TextField(blank=True)
   	 done = models.BooleanField(default=False)

Agregar la vista de la tabla en este caso se va a visualizar por el title
	 def __str__(self):
       	     return self.title
/>
	

python manage.py makemigrations => crear codigo tabla de datos de la class Task

python manage.py migrate => ejecutar codigo creado

python manage.py createsuperuser => crear usuario admin

<
En admin.py de la carpetas task importar la class Task 
	from .models import Tasks
Despues de importar Task registrar el model del admin
	admin.site.register(Tasks)
/>

<
Crear en la carpeta tasks el archivo serializer.py para Crear la funcion del Serializador que va a convertir los datos en Json
Importamos el serializers de rest_framework y la class Tasks de models.py
	from rest_framework import serializers
	from .models import Tasks
Creamos la class para seleccionar los datos que se van a utilizar
	class TaskSerializer(serializers.ModelSerializer):
		class Meta:
			model = Tasks
			fields = '__all__' => indica que todos los archivos seran convertidos
/>

<
Dentro del archivo views.py de la carpeta tasks, importamos viewsets de rest_framework, importamos del archivo serializer.py TaskSerializer, importamos del archivo models.py la class Tasks
	from rest_framework import viewsets
	from .serializer import TaskSerializer
	from .models import Tasks
Creamos la class  para se saber que datos vamos a nececitar y visualizar
 	class TaskView(viewsets.ModelViewSet):
    		serializer_class = TaskSerializer
    		queryset = Tasks.objects.all()
/>

<
Dentro de la carpeta tasks creamos el archivo urls.py donde vamos a crear las rutas que vamos a nececitar
Dentro del archivo urls.py importamos de django.urls el path y el include, importamos de res_framework el routers, importamos del archivo views.py de la carpeta tasks la class TaskView
	from django.urls import path, include
	from rest_framework import routers
	from .views import TaskView
Creamos el router donde vamos a registrar las vistas y va a generar todas las urls
	router =  routers.DefaultRouter
	router.register(r'tasks', TaskView, 'tasks')=> registra la class TaskView import
Creamos el urlpatterns que es una forma de definir las rutas o urls 
	urlpatterns = []
Los paths o rutas que estan dentro de urlpatterns reciben tres parametros principalmente el primero el nombre de la url o como va hacer citada la url, el segundo que es lo que se va a ejecutar cuando se visite el sitio, y el tercero el nombre.
	urlpatterns = [path("apiv1/", include(router.urls))]

Todo el codigo anterior estan generando las rutas GET,POST,PUT,DELETE
/>

<
Dentro de la carpeta django_api en el arrchivo urls.py importamos de django.urls el include
Agregamos dentro de urlpatterns la direccion del archivo urls.py de la carpeta tasks
	from django.urls import path, include

	urlpatterns = [
    	path('admin/', admin.site.urls),
    	path('tasks/', include('tasks.urls'))
	]
Una vez ejecutado lo anterior la app sabe todas la urls que se a creado
/>

<
Añadir un modulo que autodocumente nuestra aplicacion
	pip install coreapi
Configurar modulo en el archivo settings.py de la carpeta django_api
INSTALLED_APPS = ['coreapi'] => ubicar antes de tasks
Ir a urls.py de la carpeta tasks, importamos de rest_framework.documentation el include_docs_urls
	from rest_framework.documentation import include_docs_urls
Añadimos un nuevo urls(path) dentro de urlpatterns
	urlpatterns = [
    path("apiv1/", include(router.urls)),
    path("docs/", include_docs_urls(title="TASK API"))
]
Agregar el AutoSchemma en settings.py de la carpeta django_api
	REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}
/>

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-Empezando El Front 
Abrimos una nueva terminal para el servidor del Front
npm create vite => crear project de react en vite

npm install react-router-dom => Es un modulo para poder tener multiples paginas en el front
npm install react-hot-toast => Modulo para ventanas de  notificaciones 
npm install axios => modulo para poder hacer peticiones al backend
npm install react-hook-form => validar y captura datos de inputs creados 

En la carpeta src crea una carpeta pages que va a almacenar multiples paginas.
Crear dentro de src la carpeta components que va almacenar fracciones de interfas por ejemplo botones, listas, formularios.
Crear la carpeta api dentro de src, esta carpeta api es para poder decir que funciones van a poder pedir datos al backend.

Dentro de la Carpeta pages de src creamos los archivos TaskPage.jsx y TaskFormPage.jsx
TaskPage.jsx => Nos servira para poder enlistar todas las tareas
TaskFormPage.jsx => Servira para poder generar un formulario de tareas y permitir al usuario que ingrese mediante inputs los datos que quiere guardar.
 <
Creamos las funciones basicas dentro de sus archivos TaskPage.jsx y TaskFormPage.jsx
Ejemplo:
	import React from "react";

	export function TaskPage() {
    	return (
        	<dir>TaskPage</dir>
   	 )
	}

/>

<
En el archivo App.jsx, importamos BrowserRouter, Routes, Route, Navigate de 'react-router-dom', importamos los archivos TaskPage.jsx y TaskFormPage.jsx
	import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
	import { TaskPage } from "./pages/TaskPage"
  	import { TaskFormPage } from "./pages/TaskFormPage"
Dentro de la funcion App() creamos nuestras rutas:

	function App(){
	  return (
	    <BrowserRouter>
	    <Routes>
	      <Route path='/' element={<Navigate to="/tasks" />}/>
	      <Route path='/tasks' element={<TaskPage/>}/>
 	     <Route path='/tasks-create' element={<TaskFormPage/>}/>
 	   </Routes>
 	   </BrowserRouter>
 	 )
	}
/>


<
Dentro de la carpeta components creamos el archivo Navigation.jsx y dentro de este archivo, importamos el componente Link de 'react-router-dom' 
 	import {Link} from 'react-router-dom' => reemplazo de la etiqueta 'a'
Creamos la funcion Navigation():

	export function Navigation(){
   	 return (
     	  <div>
     	   <Link to="/tasks"><h1>Task App</h1></Link>
      	   <Link to="/tasks-create">Create Task</Link>
     	  </div>

   	 )
	}

Impotamos el archivo creado dentro del archivo App.jsx:
	import { Navigation } from "./components/Navigation"
Lo agregamos dentro de la funcion App():
	function App() {
 	 return (
   	 <BrowserRouter>
    	 <Navigation/>	 
     	 <Routes>
     		<Route path="/" element={<Navigate to="/tasks" />} />
       	 	<Route path="/tasks" element={<TaskPage />} />
       	 	<Route path="/tasks-create" element={<TaskFormPage />} />
     	 </Routes>
    	 </BrowserRouter>
 	 );
	}
/>

<
Dentro de la carpeta components creamos el archivo TasList.jsx, importamos useEffect
	import { useEffect } from "react"
Creamos la funcion TaskList():
	export function TaskList(){
Ejecutamos el useEffect que indica que apenas arranque la pagina muestre un console.log
	useEffect(()=>{
		console.log('pagina cargada')
	},[])
  	  return <div>TaskList</div>
	}
Dentro del archivo TaskPage.jsx de la carpeta pages importamos TaskList:
	import { TaskList } from "../components/TaskList";
Agregamos TaskList a la funcion TaskPage():

	export function TaskPage() {
    	return <TaskList/> 
	}

/>

<
Dentro de la carpeta api creamos el archivo tasks.api.js que va a enviar las peticiones al backend y este va a devolver los datos y asi los podremos almacenar los datos dentro de nuestra app de front
Importamos axios en tasks.api.js:
	import axios from 'axios'
Creamos la funcion getAllTask:
	export const getAllTask = ()=>{
    	return axios.get('http://127.0.0.1:8000/tasks/apiv1/tasks/')
	}
Importamos la funcion getAllTask en TaskList.jsx:
        import { getAllTask } from "../api/tasks.api";
Agregamos getAllTask ala funcion TaskList():
	export function TaskList() {
 	 useEffect(() => {
    	function loadTasks() {
     	 const res = getAllTask(); => esta es una peticion asincrona
     	 console.log(res);
   	 }
    	loadTasks();
  	}, []);
 	 return <div>TaskList</div>;
	}
Modificamos la funcion TaskList para que sea asincrona y reciba los datos de las peticiones, agregamos el async await:
	export function TaskList() {
  	useEffect(() => {
    	async function loadTasks() {
     	 const res = await getAllTask();
      	console.log(res);
   	 }
   	 loadTasks();
 	 }, []);
 	 return <div>TaskList</div>;
	}
Dentro del archivo TaskList.jsx importamos useState para crear estados y guarda los datos que estan enviando del backend:
	import { useEffect, useState } from "react";
Agregamos useState en la funcion TaskList() y la modificamos para que nos devuelva los datos que nececitamos:
	export function TaskList() {
  	const [tasks, setTasks] = useState([]);
  	useEffect(() => {
   	 async function loadTasks() {
     	 const res = await getAllTask();
      	setTasks(res.data);
    	}
   	 loadTasks();
 	 }, []);
 	 return (
  	  <div>
    	  {tasks.map((task) => (
     	   <div>
      	    <h1>{task.title}</h1>
        	  <p>{task.description}</p>
        	  <hr />
        	</div>
     	 ))}
   	 </div>
  	);
	}
/>

<
Crear dentro de la carpeta components el archivo TaskCard.jsx y crear la funcion TaskCard():
	
	export function TaskCard({task}){
    		return (
        	 <div >
        	 <h1>{task.title}</h1>
        	 <p>{task.description}</p>
        	 <hr />
     		 </div>
    		 )
		}
Dentro de TaskList.jsx importamos la funcion TaskCard():
	import { TaskCard } from "./taskCard";
Y se la agregamos a la funcion TasList():
	export function TaskList() {
  	 const [tasks, setTasks] = useState([]);

 	 useEffect(() => {
    	  async function loadTasks() {
     	   const res = await getAllTask();
      	   setTasks(res.data);
    	 }
   	 loadTasks();
 	}, []);
  	return (
    	 <div>
      	  {tasks.map((task) => (
       	   <TaskCard key={task.id} task = {task}/>
     	  ))}
   	 </div>
  	);
       }
/>

<
En el archivo taskFormPage.jsx importamos useForm de react-hook-form 
	import {useForm} from "react-hook-form"
Y lo implementamos en la funcion TaskFormPage():
     export function TaskFormPage() {
       const {
         register,
         handleSubmit,
         formState: { errors },
       } = useForm();
       const submit = handleSubmit((data) => {
        console.log(data);
       });
       return (
         <div>
           <form onSubmit={submit}>
             <input
               type="text"
               placeholder="Title"
               {...register("title", { required: true })}
             />
             {errors.title && <span>Campo Requerido</span>}
             <textarea
               rows="3"
               placeholder="Description"
               {...register("description", { required: true })}
             ></textarea>
             {errors.description && <span>Campo Requerido</span>}
             <button>Save</button>
           </form>
         </div>
       );
     }

En el archivo tasks.api.js modificar las funciones:

import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://127.0.0.1:8000/tasks/apiv1/tasks/",
});
export const getAllTask = () => {
  return taskApi.get("/");
};

export const createTask = (task) => {
  return taskApi.post("/", task);
};

En el archivo TaskFormPage.jsx importamos la funcion createTsk(), importamos useNavigate de 'react-router-dom'
	import { createTask } from "../api/tasks.api";
	import {useNavigate} from 'react-router-dom'
Y lo implementamos en la funcion TaskFormOage() dentro de submit:

 const navigate = useNavigate();
  const submit = handleSubmit(async data=> {
  await createTask(data)
  navigate("/tasks") =>cuando se ejecute esta funcion se redireccionara al parametro dado
  });=> como espera una respueta es una funcion asincrona

/>

<
En el archivo taskCard importamos useNavigate de 'react-router-dom':
	import {useNavigate} from 'react-router-dom'
Y lo ejecutamos dentro de la funcion TaskCard():

export function TaskCard({task}){
  const navigate = useNavigate();
    return (
        <div style={{background: '#101010'}}
        onClick={()=>{
          navigate(`/tasks/${task.id}`)
        }}
        >
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <hr />
      </div>
    )
}

En el archivo App.jsx agregamos un nuevo Route
<Route path="/tasks/:id" element={<TaskFormPage />} />

En el archivo TaskFormPage.jsx importamos useParams => Para extraer los parametros de las URLS:
	import {useNavigate, useParams} from 'react-router-dom'
Ejecutamos el params y Agregamos el button Delete despues del form,

{params.id && <button>Delete</button>} => si params.id es True muestrame el boton

En el archivo tasks.api.js agregamos la funcion deleteTask

export const deleteTask = (id) => {
  return taskApi.delete(`/${id}`);
};

Importamos la funcion deleteTask en el archivo TaskFormPage.jsx:
	import { createTask, deleteTask } from "../api/tasks.api";

Ejecutamos la funcion deleteTask() dentro del button Delete:
 {params.id && <button onClick={async()=>{
       const confirm = window.confirm('¿Eliminar la Tarea?')
        if(confirm){
          await deleteTask(params.id)
	  navigate('/tasks')
        }
      }}>Delete</button>}

/>

<
En el archivo tasks.api.js agregamos la funcion getTask y updateTask

export const getTask = (id) => {
  return taskApi.get(`/${id}/`);
};

export const updateTask = (id, task) => {
  return taskApi.put(`/${id}/`, task);
};

Y las importamos junto con useEffect en el archivo TaskFormPage.jsx
	import React, { useEffect } from "react";
	import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";

Ejecutamos dentro de TaskFormPage():

const submit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
       const {
        data: {title, description}
      } =  await getTask(params.id);
       setValue('title', title)
       setValue('description', description)
      }
    }
    loadTask();
  }, []);

/>

<
En el archivo App.jsx importamos Toaster de react-hot-toast':
	import {Toaster} from 'react-hot-toast'

Y lo agregamos dentro de la funcion App() debajo de <Routes/>:
	<Toaster/>

En el archivo ToaskFormPage.jsx importamos toast de 'react-hot-toast'
	import {toast} from 'react-hot-toast'
Y lo agregamos dentro de las Funciones debajo de los path o routes
Ejemplo:
      await createTask(data);
      toast.success('Tarea Creada', {
        position: 'top-left',
        style: {
          background: 'purple',
          color: 'white'
        }
      })
    }
En la terminal del proyecto del Front Inastalamos Tailwind CSS 

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", => agregamos esto en Tailwind.js
  ],


@tailwind base;
@tailwind components; => Agregamos esto en html.css
@tailwind utilities;

En el archivo App.jsx agregamos un className:
	
function App() {
  return (
    <BrowserRouter>
    <div className="container mx-auto">  
    <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/tasks-create" element={<TaskFormPage />} />
        <Route path="/tasks/:id" element={<TaskFormPage />} />
      </Routes>
      <Toaster/>
    </div>
    </BrowserRouter>
  );
}

En el archivo TaskList.jsx agregamos un className:

 <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>

Agregamos un classname al archivo TaskCard.jsx

 <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/tasks/${task.id}`);
      }}
    >
      <h1 className="font-bold uppercase">{task.title}</h1>
      <p className="text-slate-400">{task.description}</p>
    </div>

Continuar Agregando los estilos.






