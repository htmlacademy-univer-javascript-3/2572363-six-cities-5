import cn from 'classnames';
import { useState } from 'react';
import { SortOption } from './sort-option.ts';

type SortOptionsProps = {
  onSort: (sortOption: SortOption) => void;
  activeSortOption: SortOption;
}

export default function SortOptions(props: SortOptionsProps) {
  const { onSort, activeSortOption } = props;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleOptionClick = (sortOption: SortOption) => {
    onSort(sortOption);
    setIsOptionsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOptionsOpen((prev) => !prev)}
      >
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOptionsOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortOption).map((option) => (
            <li
              key={option}
              className={cn('places__option', { 'places__option--active': option === activeSortOption })}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>)}
    </form>
  );
}
