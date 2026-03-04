export const initialStore = () => {
  return {
    message: null,
    todos: [],
    favorites: [],
    user: {
      id: 1,
      lastname: "Deimian Vásquez"
    },
    people:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':
      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'DELETE_TASK':
      return {
        ...store,
        todos: store.todos.filter((item) => item.id != action.payload)
      };

    case 'SET_ALL_TODOS':
      return {
        ...store,
        todos: action.payload
      };

    case 'SET_TASK':
      
      return {
        ...store,
        todos: [...store.todos, action.payload]
      }
    case 'SET_FAV':
      return{
        ...store,
        favorites: [...store.favorites, action.payload]
      }

    case 'SET_CHARACTER':
      return {
        ...store,
        people: action.payload
      }
    default:
      throw Error('Unknown action.'); // O devuelva el state
  }
}
