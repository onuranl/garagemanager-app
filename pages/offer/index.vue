<template>
  <div>
    <b-tabs v-model="activeSubTab">
      <b-tab-item label="Teklif Listesi">
        <card-component class="has-table has-mobile-sort-spaced">
          <offer-list-table @refreshOffers="getOffers" :clients="offers" />
        </card-component>
      </b-tab-item>
      <b-tab-item label="Teklif Ekle">
        <add-offer @refreshOffers="getOffers" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'

import AddService from '~/components/AddService.vue'
import OfferListTable from '~/components/OfferListTable.vue'
import AddOffer from '~/components/AddOffer.vue'
export default {
  components: {
    ClientsTableSample,
    CardComponent,
    AddService,
    OfferListTable,
    AddOffer,
  },
  data() {
    return {
      offers: [],
    }
  },
  async created() {
    try {
      let offers = await this.$services.offer.get(this.$auth.user.companyID._id)

      this.offers = offers.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getOffers() {
      try {
        let offers = await this.$services.offer.get(
          this.$auth.user.companyID._id
        )

        this.offers = offers.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
