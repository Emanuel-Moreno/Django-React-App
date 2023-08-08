import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const submit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea Actualizada", {
        position: "top-left",
        style: {
          background: "purple",
          color: "white",
        },
      });
    } else {
      await createTask(data);
      toast.success("Tarea Creada", {
        position: "top-left",
        style: {
          background: "purple",
          color: "white",
        },
      });
    }
    navigate("/tasks");
  });
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);
  return (
    <div className=" max-w-xl mx-auto">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Campo Requerido</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>Campo Requerido</span>}
        <button className=" bg-indigo-500 p-3 rounded-lg block w-full mt-3" >Save</button>
      </form>
      {params.id && (
        <button
        className=" bg-red-500 p-3 rounded-lg block w-full mt-3"
          onClick={async () => {
            const confirm = window.confirm("¿Eliminar la Tarea?");
            if (confirm) {
              await deleteTask(params.id);
              toast.success("Tarea Eliminada", {
                position: "top-left",
                style: {
                  background: "purple",
                  color: "white",
                },
              });
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
