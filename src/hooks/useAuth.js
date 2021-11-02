import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router'

import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase'

import { useDispatch } from 'react-redux';
import { login, logout, selectIsError, selectIsLoading, selectIsSubscribed, selectProductList, setLoading, setProducts, updateSubscriber } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export const useAuth = () => {
    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoading)
    const isSubscribed = useSelector(selectIsSubscribed)
    const isError = useSelector(selectIsError)

    const [products, setProducts] = useState([])

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {
        //Checking if authorization is OK to log in user automatically
        //it is a listener which listens any sort of authentication (persisted)

        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                //user is logged in
                dispatch(login({
                    uid: userAuth.uid,
                    email: userAuth.email
                }))

            } else {
                //user is not logged out
                dispatch(logout())
                history.push("/login")
                setTimeout(() => {
                    dispatch(setLoading(false))
                }, 2000);
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (user) {
            db.collection("customers")
                .doc(user.uid)
                .collection("subscriptions")
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(async subscription => {
                            return dispatch(updateSubscriber({
                                role: subscription.data().role,
                                current_period_end: subscription.data().current_period_end.seconds,
                                current_period_start: subscription.data().current_period_start.seconds
                            }))
                        })
                    } else {
                        return dispatch(updateSubscriber(false))
                    }
                    dispatch(setLoading(false))
                })

            db.collection("products")
                .where("active", "==", true)
                .get()
                .then((querySnapshot) => {
                    const products = {}

                    querySnapshot.forEach(async (productDoc) => {
                        products[productDoc.id] = productDoc.data()

                        const priceSnap = await productDoc.ref.collection("prices").get()

                        priceSnap.docs.forEach((price) => {
                            products[productDoc.id].prices = {
                                priceId: price.id,
                                priceData: price.data()
                            }
                        })
                    })
                    // dispatch(setProducts(products))
                    setProducts(products)
                    dispatch(setLoading(false))
                })
        }
    }, [user])

    return {
        userConfig: {
            user,
            isSubscribed
        },
        state: {
            isLoading,
            isError
        },
        products
    }
}

export default useAuth