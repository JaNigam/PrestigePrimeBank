import { useContext } from "react"
// import FormContext from "./FormContext"
import FormContext from "./FormContext"

const useFormContext = () => {
    return useContext(FormContext)
    // return( <h1> hii </h1>)
}

export default useFormContext