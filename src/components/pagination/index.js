import React, { useCallback } from 'react'
import './style.css'
import {cn as bem} from '@bem-react/classname'
import PropTypes from "prop-types"

const Pagination = (props) => {
  const cn = bem('Pagination')
  // const select = useSelector(state => ({
  //   count: state.catalog.count,
  //   page: state.pagination.page,
  //   limit: state.pagination.limit
  // }))

  const btnNumber = []
  const lastPage = Math.ceil(props.count/props.limit)
  const next = props.page < 2 ? props.page + 2 : props.page + 1
  const prev = props.page > 1 && props.page < lastPage  ? props.page - 2 : props.page === lastPage  ? props.page - 3 : props.page - 1
  for (let i=1;i <= lastPage; i++){
    btnNumber.push(i)
  }
  const callbacks = {
      nextPage: (num) => {
        props.nextPage(num)
      },
  }
  return (
    <div className={cn()}>
      {props.page > 2 &&
        <>
        <button
          className={cn('button')}
          onClick={() => callbacks.nextPage(1)}
        >1</button>
        {props.page > 3 && <span className={cn('dots')}>...</span>}
        </>
      }
      {btnNumber.map((num) => 
        <button
          key={num}
          onClick={() => callbacks.nextPage(num)}
          className={props.page === num ? cn('button active') : cn('button')}
        >
          {num}
        </button>
      ).slice(prev, next)}
      {lastPage - 1 > props.page &&
        <>
          {lastPage - 2 > props.page && <span className={cn('dots')}>...</span>}
          <button
            className={cn('button')}
            onClick={()=> callbacks.nextPage(lastPage)}
          >{lastPage}</button>
        </>
      }
    </div>
  )
}

Pagination.propTypes = {
  nextPage: PropTypes.func,
  count: PropTypes.number,
  page: PropTypes.number,
}
Pagination.defaultProps = {
  nextPage: () => {},
  count: 0,
  page: 1
}
export default Pagination