import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useOrderContext } from "../../utils/GlobalState";
import { ADD_TO_BUILD, UPDATE_BUILD_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function PartItem(item) {
  const [state, dispatch] = useOrderContext();

  const {
    image,
    name,
    description,
    _id,
    link,
    category,
    price
  } = item;

  const { build } = state

  const addToBuild = () => {
    const itemInBuild = build.find((buildItem) => buildItem._id === _id)
    if (itemInBuild) {
      dispatch({
        type: UPDATE_BUILD_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInBuild.purchaseQuantity) + 1
      });
      idbPromise('build', 'put', {
        ...itemInBuild,
        purchaseQuantity: parseInt(itemInBuild.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_BUILD,
        part: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('build', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="col-sm-4 mb-3 mb-sm-0 pb-4">
      <div className="card border border-2" style={{height: "571px"}} >
        <Link to={`/parts/${_id}`}>
          <img
            className="card-img-top"
            alt={name}
            src={`/images/${image}`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <Link to={`${link}`} target="_blank">Manufacturer's Website</Link>
          <p className="card-text">${price}</p>
        </div>
        <button type="button" className="btn btn-success m-1" onClick={addToBuild}>Add to Build</button>
      </div>
    </div>
  );
}

export default PartItem;
