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
        {user.orders.length ? (
          user.orders.map((order) => (
            <div key={order._id}>
              <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
              {order.parts.map(({ _id, image, name, price, category }, index) => (
                <div key={index} className="">
                  <Link to={`/products/${_id}`}>
                    <div className="d-flex align-items-stretch" style={{ maxWidth: "292px" }}>
                      <img
                        className="rounded-start img-fluid"
                        style={{ objectFit: "cover", height: "100%" }}
                        src={`/images/${image}`}
                        alt={image}
                      />
                    </div>
                  </Link>
                </div>
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