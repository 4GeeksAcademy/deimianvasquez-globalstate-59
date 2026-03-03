import { useState, useEffect } from "react";
import useglobalReducer from "../hooks/useGlobalReducer"
import "../styles/home.css"

const urlBaseTodos = "https://playground.4geeks.com/todo"
const stateTask = {
	label: "",
	is_done: false
}

//create your first component
const Home = () => {
	const [task, setTask] = useState(stateTask)
	const [filterSatatus, setFilterStatus] = useState("all")


	// globalState
	const {dispatch, store} = useglobalReducer()


	const getAllTask = async () => {
		try {
			// hacer fetch
			const response = await fetch("https://playground.4geeks.com/todo/users/deimian")
			const data = await response.json()

			if (response.ok) {
				// aquí debemos mandarlas al store global
				// setTodos(data.todos)
				dispatch({type:"SET_ALL_TODOS", payload:data.todos})
			}
			if (response.status == 404) {
				// crear una funcion que crea el usuario --> en breve
				createUser()
			}

		} catch (error) {

		}
	}

	function handleChange({ target }) {
		setTask({
			...task,
			[target.name]: target.value
		})
	}

	async function addNewTask(event) {
		try {
			if (event.key == "Enter") {
				// aquí debemos validar que la tarea este llena
				const response = await fetch(`${urlBaseTodos}/todos/deimian`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						//en caso de mas headers van acá
					},
					body: JSON.stringify(task)
				}) // finaliza el fetch

				if (response.ok) {
					// consultar las tareas nuevamente
					setTask(stateTask)

					const data = await response.json()

					dispatch({type: "SET_TASK", payload:data})


					// getAllTask()
				}
			}
		} catch (error) {

		}
	}


	async function createUser() {
		try {
			const response = await fetch(`${urlBaseTodos}/users/deimian`, {
				method: "POST"
			})

		} catch (error) {

		}
	}


	async function taskDelete(id) {
		try {
			const response = await fetch(`${urlBaseTodos}/todos/${id}`, {
				method: "DELETE"
			})
			if (response.ok) {
				getAllTask()
			}
		} catch (error) {

		}
	}

	async function taskDone(task) {
		try {
			const response = await fetch(`${urlBaseTodos}/todos/${task.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					is_done: !task.is_done
				})
			})

			if (response.ok) {
				getAllTask()
			}

		} catch (error) {

		}
	}

	const filterTodos = store.todos.filter((item) => {
		if (filterSatatus === "done") return item.is_done
		if (filterSatatus === "pending") return !item.is_done
		return true
	})

	

	useEffect(() => {
		getAllTask()
	}, [])


	return (

		<>


			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-6">
						<h1 className="text-center">Todo list</h1>

						<input
							type="text"
							name="label"
							placeholder="Ingresa la tarea"
							className="form-control"
							value={task.label}
							onChange={handleChange}
							onKeyDown={addNewTask}
						/>


						<ul className="list-group list-group-flush my-todos">
							{
								filterTodos.length <= 0 ?
									<li>Agrega una tarea</li> :
									<>
										{
											filterTodos.map((item) => {
												return (

													<li
														key={item.id}
													>
														<div className="d-flex align-items-center justify-content-between gap2">
															<span>
																{item.label}
															</span>

															<div className="d-flex align-items-center gap-2 px-2">
																<input
																	type="checkbox"
																	checked={item.is_done}
																	onChange={() => taskDone(item)}
																/>
																<button
																	className="btn btn-outline-danger"
																	onClick={() => taskDelete(item.id)}
																>
																	Eliminar
																</button>
															</div>
														</div>
													</li>
												)
											})

										}
									</>
							}
						</ul>
					</div>
				</div>
				<div className="row mt-2">
					{/* 
					1.- All
					2.- Task End
					3.- Task pending
				*/}

					<div className="col-12 col-md-6 offset-md-3 border border-danger">
						<div className="d-flex justify-content-center gap-3 flex-wrap">
							{/* all */}
							<label className="d-flex align-items-center gap-1">
								<input
									type="checkbox"
									checked={filterSatatus === "all"}
									onChange={() => setFilterStatus("all")}
								/>
								<span>Todas</span>
							</label>

							{/* Task end */}
							<label className="d-flex align-items-center gap-1">
								<input
									type="checkbox"
									checked={filterSatatus === "done"}
									onChange={() => setFilterStatus("done")}

								/>
								<span>Finalizadas</span>
							</label>

							{/* Task pending */}
							<label className="d-flex align-items-center gap-1">
								<input
									type="checkbox"
									checked={filterSatatus === "pending"}
									onChange={() => setFilterStatus("pending")}
								/>
								<span>Por finalizar</span>
							</label>
						</div>
					</div>
				</div>
			</div >
		</>

	);
};

export default Home;