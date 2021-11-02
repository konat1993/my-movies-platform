import { loadStripe } from '@stripe/stripe-js'
import { db } from './firebase'

export const getSubscription = async (priceId, user) => {
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

export default getSubscription