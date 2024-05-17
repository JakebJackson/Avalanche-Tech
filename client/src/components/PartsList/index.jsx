import { useEffect } from 'react';
import { useOrderContext } from '../../utils/GlobalState';
import PartItem from '../PartItem';
import { UPDATE_PARTS} from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PARTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function PartList() {
  const [state, dispatch] = useOrderContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PARTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PARTS,
        parts: data.parts,
      });
      data.parts.forEach((part) => {
        idbPromise('parts', 'put', part);
      });
    } else if (!loading) {
      idbPromise('parts', 'get').then((parts) => {
        dispatch({
          type: UPDATE_PARTS,
          parts: parts,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterParts() {
    if (!currentCategory) {
      return state.parts;
    }

    return state.parts.filter(
      (part) => part.category._id === currentCategory
    );
  }

  return (
    <div className="p-4">
      {state.parts.length ? (
        <div className="row">
          {filterParts().map((part) => (
            <PartItem
              key={part._id}
              _id={part._id}
              image={part.image}
              name={part.name}
              description={part.description}
              link={part.manuLink}
              price={part.price}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any parts yet!</h3>
      )}
    </div>
  );
}

export default PartList;