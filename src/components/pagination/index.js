import React, { useCallback } from 'react'
import useSelector from '../../store/use-selector'
import './style.css'
import {cn as bem} from '@bem-react/classname'
import PropTypes from "prop-types"

const Pagination = (props) => {
  const cn = bem('Pagination')
  const select = useSelector(state => ({
    count: state.catalog.count,
    page: state.pagination.page,
    limit: state.pagination.limit
  }))

  const btnNumber = []
  const lastPage = Math.ceil(select.count/select.limit)
  const next = select.page < 3 ? select.page + 2 : select.page + 1
  const prev = select.page > 2 && select.page - 2
  for (let i=1;i <= lastPage; i++){
    btnNumber.push(i)
  }
  const callbacks = {
      nextPage: useCallback((num) => {
        props.pagination(num)
      }, [])
  }
  return (
    <div className={cn()}>
      {select.page > 2 &&
        <>
        <button
          className={cn('button')}
          onClick={() => callbacks.nextPage(1)}
        >1</button>
        <span className={cn('dots')}>...</span>
        </>
      }
      {btnNumber.map((num) => 
        <button
          key={num}
          onClick={() => callbacks.nextPage(num)}
          className={select.page === num ? cn('button active') : cn('button')}
        >
          {num}
        </button>
      ).slice(prev, next)}
      {lastPage - 1 > select.page &&
        <>
          <span className={cn('dots')}>...</span>
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
  nextPage: PropTypes.func.isRequired,
}
Pagination.defaultProps = {
  nextPage: () => {},
}
export default Pagination