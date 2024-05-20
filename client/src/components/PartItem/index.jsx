import { Link } from "react-router-dom";
import { useOrderContext } from "../../utils/GlobalState";
import { ADD_TO_BUILD, UPDATE_BUILD_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// TODO: Add modals in place of alerts.

function PartItem(item) {
  const [state, dispatch] = useOrderContext();

  const memoryCategory = "RAM";
  const storageCategory = "Storage";

  const {
    image,
    name,
    description,
    _id,
    link,
    quantity,
    category,
    price
  } = item;

  const { build } = state;

  const addToBuild = () => {
    const existingItem = build.find((buildItem) => buildItem._id === _id);
    const existingItemsInCategory = build.filter((buildItem) => buildItem.category === category);


    if (existingItem) {
      // If item already exists in build
      if (existingItem.purchaseQuantity < 4) {
        // Check if RAM or Storage and limit to 4 units
        if (category === memoryCategory || category === storageCategory) {
          dispatch({
            type: UPDATE_BUILD_QUANTITY,
            _id: _id,
            purchaseQuantity: existingItem.purchaseQuantity + 1
          });
          idbPromise('build', 'put', {
            ...existingItem,
            purchaseQuantity: existingItem.purchaseQuantity + 1
          });
        } else {
          alert(`You can only add a single unit to this category.`);
        }
      } else {
        
        alert(`You can only add up to 4 units of this category.`);
      }
    } else {
      // If item is not already in build
      if (
        existingItemsInCategory.length < 4 ||
        category === memoryCategory ||
        category === storageCategory
      ) {
        dispatch({
          type: ADD_TO_BUILD,
          part: { ...item, purchaseQuantity: 1 }
        });
        idbPromise('build', 'put', { ...item, purchaseQuantity: 1 });
      } else {
        alert('You already have four items from this category in your build.');
      }
    }
  };

  return (
    <div className="col-sm-4 mb-3 mb-sm-0 pb-4">
      <div className="card border border-2" style={{ height: "571px" }}>
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