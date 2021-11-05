import React from 'react'

import getSubscription from '../../services/getSubscription'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsSubscribed, selectProductList, selectUser, setLoading, updateSubscriber } from '../../features/userSlice'

import SubscribeOption from "../SubscribeOption/SubscribeOption"

import "./SubscribePlans.scss"
export const SubscribePlans = ({ signOut }) => {
    const isSubscribed = useSelector(selectIsSubscribed)
    const user = useSelector(selectUser)
    const products = useSelector(selectProductList)

    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(setLoading(true))
        setTimeout(() => {
            signOut()
            dispatch(updateSubscriber(null))
        }, 1200);
    }

    const loadCheckout = (priceId) => {
        getSubscription(priceId, user)
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
                products && Object.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(
                        isSubscribed?.role
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

            <button onClick={signOutHandler} className="profileScreen__signOut">Sign Out</button>

        </div>
    )
}

export default SubscribePlans