<template>
  <div>
    <section class="section">
      <card-component>
        <div class="columns">
          <div class="column">
            Depo İsmi: <b>{{ name }}</b>
          </div>
          <div class="column">
            <button @click="isActive = true" class="button">Ürün Ekle</button>
            <add-product
              v-if="isActive"
              @isntActive="isActive = false"
              @refreshProduct="getProduct"
            />
          </div>
        </div>
      </card-component>
      <card-component title="Ürün Listesi">
        <product-list-table @refreshProduct="getProduct" :clients="products" />
      </card-component>
    </section>
  </div>
</template>

<script>
import AddProduct from '~/components/AddProduct.vue'
import CardComponent from '~/components/CardComponent.vue'
import ProductListTable from '~/components/ProductListTable.vue'
export default {
  components: { ProductListTable, CardComponent, AddProduct },
  data() {
    return {
      products: [],
      isActive: false,
      name: '',
    }
  },
  async fetch() {
    try {
      let products = await this.$services.product.get(this.$route.params.id)
      let store = await this.$services.store.getByStoreID(this.$route.params.id)

      if (products) {
        this.products = products.data
      }

      if (store) {
        this.name = store.data[0].name
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    getProduct() {
      this.$fetch()
    },
  },
}
</script>

<style></style>
