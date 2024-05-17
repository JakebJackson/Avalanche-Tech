import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Orders() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <section className="container mt-4 p-5 bg-dark border border-4 rounded-5 shadow text-white" data-bs-theme="dark">
      <div className="container">
        <h1 className="fs-1">Your Orders</h1>
        
      </div>
    </section>
  );
}

export default Orders;