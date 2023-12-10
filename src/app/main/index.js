import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Nav from '../../components/nav';

function Main() {

  const store = useStore();
  // const [loading, setLoading] = useState(false)

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    limit: state.catalog.limit,
  }));

  // const fetchItems = async() => {
  //   setLoading(true)
  //   await store.actions.catalog.load(select.limit, select.page)
  //   setLoading(false)
  // }
  useEffect(() => {
    store.actions.catalog.load(select.limit, select.page);
  }, [select.limit, select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setPage: useCallback((num) => store.actions.catalog.setPage(num),[store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item 
        item={item} 
        onAdd={callbacks.addToBasket}
        link={`item-info/${item._id}`}  
      />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <div className='inner-head'>
        <Nav setPage={callbacks.setPage }/>
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount}
          sum={select.sum}
        />
      </div>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination 
        pagination={callbacks.setPage}
        count={select.count}
        page={select.page}
        limit={select.limit}  
      />
    </PageLayout>

  );
}

export default memo(Main);
