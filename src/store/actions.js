import {ADD_COUNTER, ADD_ITEM} from "./mutations-type";

export default {
  addToCart(context, product) {
  return new Promise((resolve,reject) => {
    let pitem = this.state.cartList.find(item => item.iid === product.iid)
    if(pitem)
    {
      context.commit(ADD_COUNTER,pitem)
      resolve("当前商品数量+1")
    }
    else {
      context.commit(ADD_ITEM,product)
      resolve("成功添加到购物车")
    }
  })
  }
}
