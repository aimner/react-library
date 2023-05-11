import React, { useRef, useState } from 'react';

import magnifierImg from '../../../../assets/img/main/management/search.svg';
import magnifierImgActive from '../../../../assets/img/main/management/search_active.png';
import sortImg from '../../../../assets/img/main/management/sort.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { changeAscendingSort, setSearchValue } from '../../../../store/features/filters/filter-slice';
import { selectAscendingSort, selectSearchValue } from '../../../../store/features/filters/selectors';

import classes from './managment.module.scss';

type PropsType = {
  active: boolean;
  changeActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Management: React.FC<PropsType> = ({ active, changeActiveButton }) => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector(selectSearchValue);
  const ascendingSort = useAppSelector(selectAscendingSort);

  const [focusInput, setFocusInput] = useState(false);

  const [hideInput, setHideInput] = useState(true);

  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <div className={classes.management} style={hideInput ? {} : { justifyContent: 'center' }}>
      <div className={classes.management_inputs}>
        <div className={classes.management_inputs__search} style={hideInput ? {} : { paddingInline: '16px 13px' }}>
          <img
            src={focusInput ? magnifierImgActive : magnifierImg}
            alt='search'
            style={hideInput ? { display: 'block' } : { display: 'none' }}
            onClick={() => {
              if (window.innerWidth < 768) {
                setHideInput(false);
              }
            }}
          />

          <input
            className={hideInput ? classes.input___hide : classes.input___active}
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
            value={searchValue}
            type='text'
            placeholder='Поиск книги или автора…'
            ref={searchInput}
          />
          {hideInput || (
            <span
              onClick={() => {
                setHideInput(true);
              }}
            >
              +
            </span>
          )}
        </div>

        {hideInput && (
          <div className={classes.management_inputs__sort} onClick={() => dispatch(changeAscendingSort())}>
            <img src={sortImg} alt='sort' style={ascendingSort ? { transform: 'rotate(0.5turn)' } : {}} />
            <span>По рейтингу</span>
          </div>
        )}
      </div>
      {hideInput && (
        <div className={classes.management_buttons}>
          <div
            className={
              active
                ? `${classes.management_buttons__icons} ${classes.management_buttons__icons___active}`
                : classes.management_buttons__icons
            }
            onClick={() => {
              if (!active) changeActiveButton((value) => !value);
            }}
   
          >
            <div />
            <div />
            <div />
            <div />
          </div>
          <div
            className={
              active
                ? classes.management_buttons__lists
                : `${classes.management_buttons__lists} ${classes.management_buttons__lists___active}`
            }
            onClick={() => {
              if (active) changeActiveButton((value) => !value);
            }}
   
          >
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
    </div>
  );
};
