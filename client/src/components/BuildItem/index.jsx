import { useOrderContext } from "../../utils/GlobalState";
import { REMOVE_FROM_BUILD, UPDATE_BUILD_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// TODO: add links to the parts, add category validation and generation, add a way to add parts from client, add part validation to ensure build works.

const BuildItem = ({ item }) => {

  const [, dispatch] = useOrderContext();



  const removeFromBuild = item => {
    if (item.purchaseQuantity > 1) {
      // Now checks to see if the item quantity is greater than one so that the user can remove a single umit rather than the whole item
      dispatch({
        type: UPDATE_BUILD_QUANTITY,
        _id: item._id,
        purchaseQuantity: item.purchaseQuantity - 1
      });
      idbPromise('build', 'put', {
        ...item,
        purchaseQuantity: item.purchaseQuantity - 1
      });
    } else {
      // If the purchase quantity is 1, remove the entire item from the build
      dispatch({
        type: REMOVE_FROM_BUILD,
        _id: item._id
      });
      idbPromise('build', 'delete', { ...item });
    }
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
      <h2>{item.category}</h2>
      <hr />
      <div className="card border border-2 mb-3 w-100 d-flex flex-row">
        <div className="d-flex align-items-stretch" style={{ maxWidth: "292px" }}>
          <img
            className="rounded-start img-fluid"
            style={{ objectFit: "cover", height: "100%" }}
            src={`/images/${item.image}`}
            alt={item.image}
          />
        </div>

        <div className="card-body flex-grow-1 d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fs-4">{item.name}</h5>
            <p className="card-text d-inline"><small className="text-body-secondary">Quantity: {item.purchaseQuantity}</small></p>
            <hr />
            <p className="card-text">{item.description}</p>
          </div>
          <div>
            <hr />
            <p className="card-text fs-4 d-inline">${item.price}</p>
            
            <button className="btn btn-danger float-end d-inline" onClick={() => removeFromBuild(item)}>Remove from Build</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildItem;