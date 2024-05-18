import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useOrderContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PARTS,
} from '../utils/actions';
import { QUERY_PARTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function PartPage() {
  const [state, dispatch] = useOrderContext();
  const { id } = useParams();

  const [currentPart, setCurrentPart] = useState({});

  const { loading, data } = useQuery(QUERY_PARTS);

  const { parts, cart } = state;

  useEffect(() => {
    // already in global order
    if (parts.length) {
      setCurrentPart(parts.find((part) => part._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PARTS,
        parts: data.parts,
      });

      data.parts.forEach((part) => {
        idbPromise('parts', 'put', part);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('parts', 'get').then((indexedParts) => {
        dispatch({
          type: UPDATE_PARTS,
          parts: indexedParts,
        });
      });
    }
  }, [parts, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        part: { ...currentPart, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentPart, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentPart._id,
    });

    idbPromise('cart', 'delete', { ...currentPart });
  };

  return (
    <>
      {currentPart && cart ? (
        <section className="container mt-4 p-5 bg-dark border border-4 rounded-5 shadow text-white" data-bs-theme="dark">
          <div className="container p-4 w-75">
            <h2><strong>{currentPart.name}</strong></h2>

            <p className="fs-4">
              <strong>Price:</strong>{' '}${currentPart.price}
            </p>

            <hr />
            <img
              className="w-100 my-4"
              src={`/images/${currentPart.image}`}
              alt={currentPart.name}
            />
            <hr />

            <p>{currentPart.description}</p>

            <Link
              style={{ textDecoration: "none" }}
              to={currentPart.manuLink}
              target="_blank">
              More information...
            </Link>

            <hr />

            <p>
              <div className="btn-group w-100">
                <button className="btn btn-success mb-2 w-50 fs-5" onClick={addToCart}>
                  Add to Build
                </button>

                <button
                  disabled={!cart.find((p) => p._id === currentPart._id)}
                  onClick={removeFromCart}
                  className={`btn ${cart.find((p) => p._id === currentPart._id) ? ("btn-danger") : ("btn-secondary")} mb-2 w-50 fs-5`}
                >
                  Remove from Build
                </button>
              </div>
            </p>

            <Link style={{ textDecoration: "none" }} className="fs-2" to="/">← Go Back</Link>

          </div>
        </section>
      ) : null}
      <Cart />
    </>
  );
}

export default PartPage;
