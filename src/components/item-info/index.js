import React from 'react'
import useSelector from '../../store/use-selector'
import PropTypes from "prop-types"
import {numberFormat} from '../../utils'
import {cn as bem} from "@bem-react/classname"
import "./style.css" 

const ItemInfo = (props) => {
  const cn = bem('ItemInfo')
  const select = useSelector(state => ({
    item: state.itemInfo.item,
  }))
  if(!select.item){
    return <div className='error'>Item not found</div>
  }
  const callbacks = {
    onAdd: () => props.addProduct({
      _id: select.item._id,
      price: select.item.price,
    })
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{select.item?.description}</p>
      <p className={cn('production')}>
        Страна производитель:  
      <strong>
        {select.item?.madeIn?.title}{`(${select.item?.madeIn?.code})`}
      </strong>
      </p>
      <p className={cn('category')}>
        Категория
        <strong>{select.item?.category?.title}</strong>
      </p>
      <p className={cn('year-production')}>
        Год выпуска:
        <strong>{select.item?.edition}</strong>
      </p>
      <p className={(cn('price'))}>
        Цена:
        {numberFormat(select.item?.price)} P
      </p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ItemInfo.propTypes = {
  addProduct: PropTypes.func,
}

ItemInfo.defaultProps = {
  addProduct: () => {}
}
export default ItemInfo

