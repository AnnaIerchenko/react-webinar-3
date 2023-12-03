import React, {useCallback, useMemo, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Item from './components/item';
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const [openModal, setOpenModal] = useState(false);
  const cart = store.getState().cart;
  const sumOfItemsInCarts = store.getState().sumOfItemsInCarts;
  const counter = store.getState().counter;

  const callbacks = {
    addItemToCart: useCallback(
      (code) => {
          store.addToCart(code);
      },
      [cart]
  ),

  removeFromCart: useCallback(
      (code) => {
          store.removeFromCart(code);
      },
      [cart]
  ),
  };
  return (
    <PageLayout>
      <Head 
        title='Магазин'   
      />
      <Controls 
        caption={"Перейти"}
        title={"В корзине:"}
        setOpenModal={setOpenModal}
        counter={counter}
        sumOfItemsInCarts={sumOfItemsInCarts}
      />
      <List 
        children={list.map((item) => (
          <Item item={item} addItemToCart={callbacks.addItemToCart} />
      ))}
      />
      {openModal && (
        <Modal>
            <Cart
              cart={cart}
              setOpenModal={setOpenModal}
              sumOfItemsInCarts={sumOfItemsInCarts}
              removeFromCart={callbacks.removeFromCart}
            />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
