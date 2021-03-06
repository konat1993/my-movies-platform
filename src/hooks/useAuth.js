import { useEffect } from "react";
import { useNavigate } from "react-router";

import { auth } from "../services/firebase";
import { db } from "../services/firebase";

import { useDispatch } from "react-redux";
import {
  setProducts,
  login,
  logout,
  selectIsError,
  selectIsLoading,
  selectIsSubscribed,
  setLoading,
  updateSubscriber,
  selectProductList
} from "../features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isSubscribed = useSelector(selectIsSubscribed);
  const isError = useSelector(selectIsError);
  const products = useSelector(selectProductList);

  const dispatch = useDispatch();

  const navigate = useNavigate()
  // const history = useHistory();

  useEffect(() => {
    //Checking if authorization is OK to log in user automatically
    //it is a listener which listens any sort of authentication (persisted)

    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        );
      } else {
        //user is not logged out
        dispatch(logout());
        navigate("/login");
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (subscription) => {
              return dispatch(
                updateSubscriber({
                  role: subscription.data().role,
                  current_period_end: subscription.data().current_period_end
                    .seconds,
                  current_period_start: subscription.data().current_period_start
                    .seconds
                })
              );
            });
          } else {
            return dispatch(updateSubscriber(false));
          }
          dispatch(setLoading(false));
        });

      (async () => {
        const querySnapshot = await db
          .collection("products")
          .where("active", "==", true)
          .get();

        const productsDocs = {};
        const products = {};

        querySnapshot.forEach(async (productDoc) => {
          productsDocs[productDoc.id] = productDoc;
        });

        const productWithPricePromises = Object.entries(productsDocs).map(
          async ([productId, productDoc]) => {
            const priceSnap = await productDoc.ref.collection("prices").get();
            const productData = productDoc.data();
            products[productId] = productData;

            priceSnap.docs.forEach((price) => {
              products[productId].prices = {
                priceId: price.id,
                priceData: price.data()
              };
            });
          }
        );

        await Promise.all(productWithPricePromises);

        dispatch(setProducts(products));
        dispatch(setLoading(false));
      })();
    }
  }, [user]);

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
  };
};

export default useAuth;
