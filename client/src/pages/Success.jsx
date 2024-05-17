import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const parts = cart.map((item) => item._id);

      if (parts.length) {
        const { data } = await addOrder({ variables: { parts } });
        const partData = data.addOrder.parts;

        partData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <section className="container mt-4 p-5 bg-dark border border-4 rounded-5 shadow text-white" data-bs-theme="dark">
      <div>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </div>
    </section>

  );
}

export default Success;