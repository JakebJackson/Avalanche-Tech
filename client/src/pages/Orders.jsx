import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Orders() {
  const { loading, error, data } = useQuery(QUERY_USER);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching user data:', error);
    return <p>Error loading user data. Please try again later.</p>;
  }

  const user = data?.user;

  return (
    <section className="container mt-4 p-5 bg-dark border border-4 rounded-5 shadow text-white" data-bs-theme="dark">
      <div className="container">
        <h1 className="fs-1">Orders for {user.firstName} {user.lastName}</h1>
        <hr />
        {user.orders.length ? (
          user.orders.map((order) => (
            <div key={order._id}>
              <h3>Ordered on: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>

              {order.parts.map(({ _id, image, name, description, price, category, purchaseQuantity }, index) => (
                <section key={`${_id}-${index}`}>
                  <h2>{category.name}</h2>
                  <hr />
                  <div className="card border border-2 mb-3 w-100 d-flex flex-row">
                    <div className="d-flex align-items-stretch" style={{ maxWidth: "292px" }}>
                      <Link to={`/parts/${_id}`}>
                        <img
                          className="rounded-start img-fluid"
                          style={{ objectFit: "cover", height: "100%" }}
                          src={`/images/${image}`}
                          alt={image}
                        />
                      </Link>
                    </div>

                    <div className="card-body flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title fs-4">{name}</h5>

                        {/*<p className="card-text d-inline">
                          <small className="text-body-secondary">Quantity: {purchaseQuantity}</small>
              </p>*/ }

                        <hr />

                        <p className="card-text">{description}</p>

                      </div>
                      <div>
                        <hr />

                        <p className="card-text fs-4 d-inline">${price}</p>

                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          ))
        ) : (
          <h3>No orders found</h3>
        )}
      </div>
    </section>
  );
}


export default Orders;