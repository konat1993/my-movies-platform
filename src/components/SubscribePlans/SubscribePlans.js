import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { db } from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsSubscribed, selectProductList, selectUser, setLoading, updateSubscriber } from '../../features/userSlice'

import SubscribeOption from "../SubscribeOption/SubscribeOption"

import "./SubscribePlans.scss"
export const SubscribePlans = ({ signOut, products }) => {
    const isSubscribed = useSelector(selectIsSubscribed)
    const user = useSelector(selectUser)
    // const products = useSelector(selectProductList)

    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(setLoading(true))
        setTimeout(() => {
            signOut()
            dispatch(updateSubscriber(null))
        }, 1200);
    }

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection("customers").doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                // Show an error to your customer and
                // inspect your Cloud Function logs in the Firebase console.
                alert(`An error occurred: ${error.message}`)
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe

                const stripe = await loadStripe("pk_test_51JopVTIM4ffuPpPV5N2e6Z9bU9DJPQ5nuCeJ0oY6ZREiiRHVujqqIybdU8nByHhjkijL513jk2dYOdOS0UxeRU0w00wmUDXrBZ")
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }
    return (
        <div className="subscribePlans">
            <h3>Plans (Current plan: <span>{isSubscribed?.role ? isSubscribed?.role : "None"}</span>)</h3>
            {
                isSubscribed &&
                <p>Renewal date: {
                    new Date(isSubscribed?.current_period_end * 1000).toLocaleDateString()
                }
                </p>
            }
            {
                // products && Object.entries(JSON.parse(products)).map(([productId, productData]) => {
                products.length !== 0 && Object.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(
                        isSubscribed?.role
                    )
                    return (
                        <SubscribeOption
                            key={productId}
                            test={productData}
                            name={productData.name}
                            description={productData.description}
                            isCurrentPackage={isCurrentPackage}
                            loadCheckout={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                        />
                    )
                })
            }

            <button onClick={signOutHandler} className="profileScreen__signOut">Sign Out</button>

        </div>
    )
}

export default SubscribePlans