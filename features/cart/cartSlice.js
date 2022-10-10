import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      
        const {quantity, id} = action.payload
        let index = state.list.findIndex(product => product.id === id)

        let isProductInCart = index !== -1
        
        if(isProductInCart) {
            state.list[index].quantity = state.list[index].quantity + quantity
        }

        if(!isProductInCart) {
            state.list.push(action.payload)
        } 
    },
    increaseQuantity: (state, action) => {
      
      const {id} = action.payload
      let index = state.list.findIndex(product => product.id === id)
      if(index === -1) return
      state.list[index].quantity++

    },
    decreaseQuantity: (state, action) => {

      const {id} = action.payload
      let index = state.list.findIndex(product => product.id === id)

      if(index === -1) return
      // if before the decrease, the quantity is 1, we remove the product from the cart
      if(state.list[index].quantity === 1) {
        state.list.splice(index, 1)
        return
      } 
      // else we decrease the quantity
      state.list[index].quantity--

    },
    removeProduct: (state, action) => {
      
      const {id} = action.payload
    
      let index = state.list.findIndex(product => product.id === id)
      
      if(index === -1) return
      
      state.list.splice(index, 1)
    }
    
  }
})


export const { addProduct, increaseQuantity, decreaseQuantity, removeProduct } = cartSlice.actions

export const selectProductsCount = (state) => {
    let productsCount = 0

    state.cart.list.forEach(product => {
        productsCount += product.quantity 
    })
    
    return productsCount
}

export const selectCartProducts = (state) => {


  let products = [...state.products.list]
  let cartList = [...state.cart.list]

  let cartListWithDetails = cartList.map(({id, quantity}) => {
   
  let productWithDetail = products.find(product => product?.id === id)

  if(productWithDetail) {
    return {
      ...productWithDetail,
      quantity
    }
  }

    return productWithDetail
  })

  return cartListWithDetails

}

export const selectTotalQuantity = (state) => {
  let cartList = [...state.cart.list]
  return cartList.reduce((quantity, currentValue) => {
    if(currentValue.quantity) quantity += currentValue.quantity
    return quantity
  }, 0)

}

export const selectTotalPrice = (state) => {

  let cartProducts = selectCartProducts(state)

  return cartProducts.reduce((totalPrice, currentValue) => {

    const { quantity } = currentValue
    const { price } = currentValue?.attributes || 0

    totalPrice += (price * quantity)
    return totalPrice
  }, 0).toFixed(2)

}

export const selectCartProductIds = (state) => {

  let cartList = [...state.cart.list]

  return cartList.map(({id}) => id)

}

export default cartSlice.reducer