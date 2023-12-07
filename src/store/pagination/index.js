import StoreModule from "../module"

class Pagination extends StoreModule {
  initState() {
    return {
      page: 1,
      limit: 10
    }
  }

  setPage(num) {
    this.setState({
      ...this.getState(),
      page: num,
    }, 'меняем страницу')
  }
}

export default Pagination