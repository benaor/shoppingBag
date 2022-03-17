import { ProductType } from "./types/Product.types"
// vuex.d.ts
import { Store } from "vuex"

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    products: Array<ProductType>
    productsInBag: Array<ProductType>
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
