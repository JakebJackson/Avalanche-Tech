import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import BuildItem from '../BuildItem';
import Auth from '../../utils/auth';
import { useOrderContext } from '../../utils/GlobalState';
import { TOGGLE_BUILD, ADD_MULTIPLE_TO_BUILD } from '../../utils/actions';
import { Link } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51PHmdhP1QgxzwDT6gQJMxaIKab2r8rNC907Pw9AG7f06FgkySgu0wbyuW08XEHB9LO8dPKIJP1sLnbzkJVHWL5FC00XgzzvgZr');

const Build = () => {
  const [state, dispatch] = useOrderContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);


  useEffect(() => {
    async function getBuild() {
      const build = await idbPromise('build', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_BUILD, parts: [...build] });
    }

    if (!state.build.length) {
      getBuild();
    }
  }, [state.build.length, dispatch]);

  function toggleBuild() {
    dispatch({ type: TOGGLE_BUILD });
  }

  function calculateTotal() {
    let sum = 150;
    state.build.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const parts = state.build.map(item => ({
      _id: item._id,
      purchaseQuantity: item.purchaseQuantity
    }));

    getCheckout({
      variables: { parts }
    });
  }

  return (
    <div className="m-4">
      <h1>Your Build:</h1>
      <hr />
      {state.build.length ? (
        <div>

          {state.build.map((item) => (
            <BuildItem key={item._id} item={item} />
          ))}
          <hr />

          <h2>Service</h2>
          <hr />
          <div className="card border border-2 mb-3 w-100 d-flex flex-row">
            <div className="d-flex align-items-stretch" style={{ maxWidth: "292px" }}>
              <img
                className="rounded-start img-fluid"
                style={{ objectFit: "cover", height: "100%" }}
                src={`/images/service-picture.jpg`}
                alt="service-picture.jpg"
              />
            </div>

            <div className="card-body flex-grow-1 d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title fs-4">Custom PC Build</h5>
                <hr />
                <p className="card-text">A custom built computer put together and tested with care, made with your specifications and with you in mind!</p>
              </div>
              <div>
                <hr />
                <p className="card-text fs-4 d-inline">$150</p>

              </div>
            </div>
          </div>

          <div className="fs-4">
            <strong>Build Total:</strong> ${calculateTotal()}

            {Auth.loggedIn() ? (
              <button className="btn btn-success fs-4 float-end" onClick={submitCheckout}>Checkout</button>
            ) : (
              <Link to="/login" className="float-end">(log in to Checkout)</Link>
            )}
          </div>
        </div>
      ) : (
        <h3>You haven't started your build yet!</h3>
      )}
    </div>
  );
}

export default Build;