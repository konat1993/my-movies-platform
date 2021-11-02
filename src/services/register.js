import { auth } from './firebase'
import { useDispatch } from "react-redux"
import { setError, setLoading } from '../features/userSlice'


export const createUserWithEmailAndPassword = (dispatch, email, emailRedux, password) => {
    dispatch(setLoading(true))
    auth.createUserWithEmailAndPassword(email || emailRedux, password)
        .then((authUser) => {
        }).catch((error) => {
            dispatch(setError({
                status: true,
                message: error.message
            }))
            dispatch(setLoading(false))
        })
}

export const signInWithEmailAndPassword = (dispatch, email, emailRedux, password) => {
    dispatch(setLoading(true))
    auth.signInWithEmailAndPassword(email || emailRedux, password)
        .then((authUser) => {
        }).catch((error) => {
            dispatch(setLoading(false))
            dispatch(setError({
                status: true,
                message: error.message
            }))
        })
}

export default createUserWithEmailAndPassword