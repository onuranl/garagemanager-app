<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients"
    >
      <template slot-scope="props">
        <b-table-column label="ID" field="_id" sortable>
          {{ props.row._id }}
        </b-table-column>
        <b-table-column label="İsim" field="customerID.name" sortable>
          {{ props.row.customerID.name }}
        </b-table-column>
        <b-table-column label="Soyisim" field="customerID.surname" sortable>
          {{ props.row.customerID.surname }}
        </b-table-column>
        <b-table-column label="Araç Model" field="vehicleID.model" sortable>
          {{ props.row.vehicleID.model }}
        </b-table-column>
        <b-table-column label="İş Tipi" field="jobTypeID.name" sortable>
          {{ props.row.jobTypeID.name }}
        </b-table-column>
        <b-table-column label="Tarih">
          <small>{{ props.row.date }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              class="button is-small is-info"
              type="button"
              @click="
                confirmComplete(
                  props.row.customerID.name,
                  props.row.customerID.surname,
                  props.row._id
                )
              "
            >
              <b-icon icon="shield-check" size="is-small" />
            </button>
            <nuxt-link
              :to="{ name: 'client-id', params: { id: props.row.id } }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click="
                confirmDelete(
                  props.row.customerID.name,
                  props.row.customerID.surname,
                  props.row._id
                )
              "
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    clients: {
      type: Array,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      // clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
  },
  computed: {
    getVehicle() {
      if (this.clients.vehicleID) {
        return this.clients
      }
    },
  },
  methods: {
    confirmDelete(name, surname, id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting purchase',
        message: `'<b>${name}${surname}</b>' isimli müşterinin '<b>${id}</b>' numaralı randevusunu silmek istediğinden emin misin ?`,
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeDate(id),
      })
    },
    confirmComplete(name, surname, id) {
      this.$buefy.dialog.confirm({
        title: 'Pay',
        message: `'<b>${name}${surname}</b>' isimli müşterinin '<b>${id}</b>' numaralı randevusunu tamamlamak istediğinden emin misin ?`,
        confirmText: 'Ödeme yap',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.completeDate(id),
      })
    },
    async removeDate(dateID) {
      try {
        let remove = await this.$services.date.remove(dateID)

        if (remove) {
          this.$buefy.toast.open('Randevu Kaldırıldı !')
          this.$emit('refreshDates')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
        console.log(error)
      }
    },
    async completeDate(dateID) {
      try {
        let complete = await this.$services.date.complete(dateID)

        if (complete) {
          this.$buefy.toast.open('Randevu Tamamlandı !')
          this.$emit('refreshDates')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
        console.log(error)
      }
    },
  },
}
</script>
