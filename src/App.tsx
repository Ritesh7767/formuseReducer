import { useReducer } from "react"

interface initialStateInterface {
  email: string,
  password: string
}

const initialState: initialStateInterface = {
  email: "",
  password: ""
}

interface Action {
  type: 'EMAIL' | 'PASSWORD' | 'RESET',
  payload: string
}

const reducerFunction = (state: initialStateInterface, {type, payload}: Action) => {
  switch(type){
    case "EMAIL": 
      return {...state, email: payload}
    case 'PASSWORD': 
      return {...state, password: payload}
    case 'RESET': 
      return initialState
    default:
      throw new Error("Invalid Action Type")
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducerFunction, initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'EMAIL' | 'PASSWORD' | 'RESET') => {
    dispatch({type, payload: e.target.value})
  }

  return (
    <>
      <form>
        <label htmlFor="email">Email</label><br />
        <input id="email" onChange={e => handleChange(e, 'EMAIL')} value={state.email} type="text" placeholder="Enter your email" /><br />
        <label htmlFor="password">Password</label>
        <input type="password" onChange={e => handleChange(e, 'PASSWORD')} value={state.password} id="password" placeholder="Enter your password" /><br />
        <button onClick={() => dispatch({type: 'RESET', payload: ""})} >Reset</button>
      </form>
      {!state.email && !state.password && <div>
        No Details Available
      </div>}
      <div>
        <h4>User's Email :- {state.email}</h4>
        <h4>User's Password :- {state.password}</h4>
      </div>
    </>
  )
}

export default App