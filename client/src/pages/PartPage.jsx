import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Build from '../components/Build';
import { useOrderContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_BUILD,
  UPDATE_BUILD_QUANTITY,
  ADD_TO_BUILD,
  UPDATE_PARTS,
} from '../utils/actions';
import { QUERY_PARTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function PartPage() {
  const [state, dispatch] = useOrderContext();
  const { id } = useParams();

  const [currentPart, setCurrentPart] = useState({});

  const { loading, data } = useQuery(QUERY_PARTS);

  const { parts, build } = state;

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

  const addToBuild = () => {
    const itemInBuild = build.find((buildItem) => buildItem._id === id);
    if (itemInBuild) {
      dispatch({
        type: UPDATE_BUILD_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInBuild.purchaseQuantity) + 1,
      });
      idbPromise('build', 'put', {
        ...itemInBuild,
        purchaseQuantity: parseInt(itemInBuild.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_BUILD,
        part: { ...currentPart, purchaseQuantity: 1 },
      });
      idbPromise('build', 'put', { ...currentPart, purchaseQuantity: 1 });
    }
  };

  const removeFromBuild = () => {
    dispatch({
      type: REMOVE_FROM_BUILD,
      _id: currentPart._id,
    });

    idbPromise('build', 'delete', { ...currentPart });
  };

  return (
    <>
      {currentPart && build ? (
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
                <button className="btn btn-success mb-2 w-50 fs-5" onClick={addToBuild}>
                  Add to Build
                </button>

                <button
                  disabled={!build.find((p) => p._id === currentPart._id)}
                  onClick={removeFromBuild}
                  className={`btn ${build.find((p) => p._id === currentPart._id) ? ("btn-danger") : ("btn-secondary")} mb-2 w-50 fs-5`}
                >
                  Remove from Build
                </button>
              </div>
            </p>

            <Link style={{ textDecoration: "none" }} className="fs-2" to="/">← Go Back</Link>

          </div>
        </section>
      ) : null}
      
    </>
  );
}

export default PartPage;
