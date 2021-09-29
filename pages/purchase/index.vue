<template>
  <div>
    <b-tabs v-model="activeSubTab">
      <b-tab-item label="Alış Faturası Listesi">
        <card-component class="has-table has-mobile-sort-spaced">
          <purchase-list-table
            @refreshPurchases="getPurchases"
            :clients="purchases"
          />
        </card-component>
      </b-tab-item>
      <b-tab-item label="Alış Faturası Ekle">
        <add-purchase @refreshPurchases="getPurchases" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'

import AddService from '~/components/AddService.vue'
import PurchaseListTable from '~/components/PurchaseListTable.vue'
import AddPurchase from '~/components/AddPurchase.vue'
export default {
  components: {
    ClientsTableSample,
    CardComponent,
    AddService,
    PurchaseListTable,
    AddPurchase,
  },
  data() {
    return {
      purchases: [],
    }
  },
  async created() {
    try {
      let purchases = await this.$services.purchase.get(
        this.$auth.user.companyID._id
      )

      this.purchases = purchases.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getPurchases() {
      try {
        let purchases = await this.$services.purchase.get(
          this.$auth.user.companyID._id
        )

        this.purchases = purchases.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
