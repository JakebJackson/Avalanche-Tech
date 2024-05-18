import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useOrderContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function PartItem(item) {
  const [state, dispatch] = useOrderContext();

  const {
    image,
    name,
    description,
    _id,
    link,
    price
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        part: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
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
        <button type="button" className="btn btn-success m-1" onClick={addToCart}>Add to Build</button>
      </div>
    </div>
  );
}

export default PartItem;
