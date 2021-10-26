import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { db } from '../../firebase/firebase'

import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

import SubscribeOption from "../SubscribeOption/SubscribeOption"

import "./SubscribePlans.scss"
export const SubscribePlans = ({ signOut }) => {

    const [products, setProducts] = useState([])

    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)


    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds
                    })
                })
            })
    }, [user.uid])

    useEffect(() => {
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
                setProducts(products)
            })
    }, [])

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
            <h3>Plans (Current plan: Premium)</h3>
            <p>Renewal date: 04/03/2021</p>
            {
                Object.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(
                        subscription?.role
                    )
                    return (
                        <SubscribeOption
                            key={productId}
                            name={productData.name}
                            description={productData.description}
                            isCurrentPackage={isCurrentPackage}
                            loadCheckout={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                        />
                    )
                })
            }
            {/* <SubscribeOption title="Pureflix Standard" type="1080p" current={false}>Subscribe</SubscribeOption>
            <SubscribeOption title="Pureflix Premium" type="4k+HDR" current={true}>Current Package</SubscribeOption> */}

            <button onClick={signOut} className="profileScreen__signOut">Sign Out</button>

        </div>
    )
}

export default SubscribePlans