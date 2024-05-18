import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { useOrderContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function Categories() {
  const [state, dispatch] = useOrderContext();
  const [activeCategory, setActiveCategory] = useState('');

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    setActiveCategory(id);
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className="p-4">
      <ul className="nav nav-tabs">
        {categories.map((item) => (
          <li className="nav-item" key={item._id}>
            <Link
              className={`nav-link ${activeCategory === item._id ? 'active' : ''}`}
              onClick={() => {
                handleClick(item._id);
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li className="nav-item" key={'all'}>
          <Link
            className={`nav-link ${activeCategory === '' ? 'active' : ''}`}
            onClick={() => {
              handleClick('');
            }}
          >
            All
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;