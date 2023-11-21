/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    //инициализация мах колва элементов списка
    this.maxCode = initState.list ? Math.max(...initState.list.map(item => item.code), 0) : 0
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const existingCodes = new Set(this.state.list.map(item => item.code))
    let newCode = this.maxCode + 1
    while(existingCodes.has(newCode)){
      newCode++
    }
    this.maxCode = newCode
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: `Запись ${newCode}` }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          //количество совершенных выделений 
          item.selectionCount = (item.selectionCount || 0) + (item.selected ? 1 : 0)
        } else {
          //отмена выделения
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
