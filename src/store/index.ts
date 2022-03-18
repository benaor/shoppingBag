import { ProductType } from "./../types/Product.types"
import { createStore } from "vuex"

const productsArray: Array<ProductType> = []

export default createStore({
  state: {
    products: [...productsArray],
    productsInBag: [...productsArray]
  },
  getters: {},
  mutations: {
    loadProducts(state, products: Array<ProductType>) {
      state.products = products
    },
    loadBag(state, products: Array<ProductType>) {
      state.productsInBag = products
    },
    addToBag(state, product: ProductType) {
      state.productsInBag.push(product)
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      const updatedBag: Array<ProductType> = state.productsInBag.filter(
        (product: ProductType) => product.id !== productId
      )
      state.productsInBag = updatedBag
      localStorage.setItem("productsInBag", JSON.stringify(updatedBag))
    }
  },
  actions: {
    async loadProducts({ commit }) {
      const products: Array<ProductType> = await fetch(
        "https://fakestoreapi.com/products"
      ).then((res) => res.json())
      commit("loadProducts", products)
    },
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        const stringls: any = localStorage.getItem("productsInBag")
        const jsonls: Array<ProductType> = JSON.parse(stringls)
        commit("loadBag", jsonls)
      }
    },
    addToBag({ commit }, product: ProductType) {
      commit("addToBag", product)
    },
    removeFromBag({ commit }, productId) {
      commit("removeFromBag", productId)
    }
  },
  modules: {}
})
