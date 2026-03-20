import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

// Sort fields names
const SORT_FIELD_BY_ALPHABET = 'alphabet';
const SORT_FIELD_BY_LENGTH = 'length';

// Filter fields names
const FILTER_FIELD_BY_REVERSE = 'reverse';

export const App = () => {
  // Mutually exclusive filters (only one active at a time)
  const [sortBy, setSortBy] = useState(null);

  // Combinable filters
  const [filterBy, setFilterBy] = useState([]);

  const preparedGoods = [...goodsFromServer];

  const isFilterApplied = filter => {
    return filterBy.includes(filter);
  };

  if (sortBy === SORT_FIELD_BY_ALPHABET) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SORT_FIELD_BY_LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isFilterApplied(FILTER_FIELD_BY_REVERSE)) {
    preparedGoods.reverse();
  }

  const toggleFilter = filter => {
    if (isFilterApplied(filter)) {
      setFilterBy(prevFilterBy => prevFilterBy.filter(i => i !== filter));
    } else {
      setFilterBy(prevFilterBy => [...prevFilterBy, filter]);
    }
  };

  const resetAll = () => {
    setSortBy(null);
    setFilterBy([]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_FIELD_BY_ALPHABET,
          })}
          onClick={() => {
            setSortBy(SORT_FIELD_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => {
            setSortBy(SORT_FIELD_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isFilterApplied(FILTER_FIELD_BY_REVERSE),
          })}
          onClick={() => toggleFilter(FILTER_FIELD_BY_REVERSE)}
        >
          Reverse
        </button>

        {(filterBy.length > 0 || sortBy !== null) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetAll}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
