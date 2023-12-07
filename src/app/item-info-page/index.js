import React, { useCallback, useEffect } from 'react'
import useStore from '../../store/use-store'
import { useParams } from 'react-router-dom'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import BasketTool from '../../components/basket-tool'
import ItemInfo from '../../components/item-info'
import useSelector from '../../store/use-selector'

const ItemInfoPage = () => {
  const store = useStore()
  const {id} = useParams()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.itemInfo.item,
    list: state.catalog.list,
  }))
  useEffect(() => {
    store.actions.itemInfo.itemLoad(id)
  }, [])

  const callbacks = {
    //add to cart
    addProduct: useCallback(product => store.actions.basket.addProduct(product), [store]),
    //open cart-modal
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }
  return (
    <PageLayout>
      <Head title={select.item?.title} />
      <BasketTool 
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemInfo addProduct={callbacks.addProduct} />
    </PageLayout>
  
  )
}

export default ItemInfoPage