<template>
  <div>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="this.customers.length"
          label="Müşteri Sayısı"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="storefront"
          :number="this.products.length"
          label="Ürün Sayısı"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="calendar-account"
          :number="this.dates.length"
          label="Aktif Randevu Sayısı"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="charity"
          :number="this.suppliers.length"
          label="Tedarikçi Sayısı"
        />
      </tiles>
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="this.totalSell.toFixed(2)"
          suffix=" ₺"
          label="Toplam Satış"
        />
        <card-widget
          class="tile is-child"
          type="is-danger"
          icon="cart-minus"
          :number="this.totalPurchase.toFixed(2)"
          suffix=" ₺"
          label="Toplam Gider"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="currency-usd"
          :number="(this.totalSell - this.totalPurchase).toFixed(2)"
          suffix=" ₺"
          label="Kâr"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="profiteRate == Infinity ? '100' : profiteRate.toFixed(2)"
          suffix=" %"
          label="Kâr Oranı"
        />
      </tiles>
      <card-component title="Son 7 Günün Satış Grafiği" icon="finance">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            ref="bigChart"
            style="height: 100%;"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          >
          </line-chart>
        </div>
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
import LineChart from '@/components/Charts/LineChart'
export default {
  name: 'Home',
  components: {
    ClientsTableSample,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
      customers: [],
      products: [],
      dates: [],
      suppliers: [],
      totalPurchase: 0,
      totalSell: 0,
      profiteRate: 0,
      chartData: [],
    }
  },
  async created() {
    try {
      let customers = await this.$services.customer.getCustomer(
        this.$auth.user.companyID._id
      )

      let products = await this.$services.product.getAll(
        this.$auth.user.companyID._id
      )

      let dates = await this.$services.date.getActive(
        this.$auth.user.companyID._id
      )

      let suppliers = await this.$services.supplier.get(
        this.$auth.user.companyID._id
      )

      let totalPurchase = await this.$services.purchase.getTotal(
        this.$auth.user.companyID._id
      )

      let totalSell = await this.$services.sell.getTotal(
        this.$auth.user.companyID._id
      )

      let chartData = await this.$services.sell.getChartData(
        this.$auth.user.companyID._id
      )

      this.customers = customers.data

      this.products = products.data

      this.dates = dates.data

      this.suppliers = suppliers.data

      this.totalPurchase = totalPurchase.data.total

      this.totalSell = totalSell.data.total

      this.fillChartData(chartData.data)

      this.profiteRate =
        ((this.totalSell - this.totalPurchase) / this.totalPurchase) * 100
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    fillChartData(data) {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: data,
          },
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07'],
      }
    },
  },
}
</script>
