import {ADD_COUNTER, ADD_ITEM} from "./mutations-type";

export default {
  [ADD_ITEM](state, product) {
    state.cartList.push(product)
  },
  [ADD_COUNTER](state, product) {
    product.counter+=1
  }
}
