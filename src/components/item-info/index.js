import React from 'react'
import PropTypes from "prop-types"
import {numberFormat} from '../../utils'
import {cn as bem} from "@bem-react/classname"
import "./style.css" 

const ItemInfo = (props) => {
  const cn = bem('ItemInfo')
  // const select = useSelector(state => ({
  //   item: state.itemInfo.item,
  // }))
  if(!props.item){
    return <div className='error'>Item not found</div>
  }
  const callbacks = {
    onAdd: () => props.addProduct({
      _id: props.item._id,
      price: props.item.price,
      title: props.item.title
    })
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.item?.description}</p>
      <p className={cn('production')}>
        Страна производитель:  
      <strong>
        {props.item?.madeIn?.title}{`(${props.item?.madeIn?.code})`}
      </strong>
      </p>
      <p className={cn('category')}>
        Категория
        <strong>{props.item?.category?.title}</strong>
      </p>
      <p className={cn('year-production')}>
        Год выпуска:
        <strong>{props.item?.edition}</strong>
      </p>
      <p className={(cn('price'))}>
        Цена:
        {numberFormat(props.item?.price)} P
      </p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ItemInfo.propTypes = {
  addProduct: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  })
}

ItemInfo.defaultProps = {
  addProduct: () => {}
}
export default ItemInfo

