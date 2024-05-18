import { useOrderContext } from "../../utils/GlobalState";
import { REMOVE_FROM_BUILD, UPDATE_BUILD_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const BuildItem = ({ item }) => {

  const [, dispatch] = useOrderContext();



  const removeFromBuild = item => {
    dispatch({
      type: REMOVE_FROM_BUILD,
      _id: item._id
    });
    idbPromise('build', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_BUILD,
        _id: item._id
      });
      idbPromise('build', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_BUILD_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('build', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <section>
      <div className="card border border-2 mb-3 w-100">
        <div className="row g-0">
          <div className="col-md-3">
            <img
              className="img-fluid rounded-start"
              src={`/images/${item.image}`}
              alt={item.image}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <hr />
              <p className="card-text">{item.description}</p>
              <p className="card-text"><small className="text-body-secondary">${item.price}</small></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildItem;