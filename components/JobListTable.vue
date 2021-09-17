<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
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
        <b-table-column label="Tarih">
          <small>{{ props.row.date }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              :disabled="props.row.status == true"
              class="button is-small is-info"
              type="button"
              @click="
                confirmComplete(
                  props.row.customerID.name,
                  props.row.customerID.surname,
                  props.row._id,
                  props.row
                )
              "
            >
              <b-icon icon="shield-check" size="is-small" />
            </button>
            <nuxt-link
              :disabled="props.row.status == true"
              :to="`/service/${props.row._id}`"
              class="button is-small is-primary"
              @click="isActive = true"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              :disabled="props.row.status == true"
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
import EditJob from './EditJob.vue'
export default {
  components: { EditJob },
  props: {
    clients: [],
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
      isActive: false,
    }
  },
  methods: {
    confirmComplete(name, surname, id, data) {
      this.$buefy.dialog.confirm({
        title: 'Muhasebeye Gönder',
        message: `'<b>${name}${surname}</b>' isimli müşterinin '<b>${id}</b>' numaralı servisini muhasebeye göndermek istediğinden emin misin ?`,
        confirmText: 'Tamamla',
        cancelText: 'İptal Et',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.completeJob(id, data),
      })
    },
    confirmDelete(name, surname, id) {
      this.$buefy.dialog.confirm({
        title: 'Servisi Kaldır',
        message: `'<b>${name}${surname}</b>' isimli müşterinin '<b>${id}</b>' numaralı servisini silmek istediğinden emin misin ?`,
        confirmText: 'Sil',
        cancelText: 'İptal Et',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeJob(id),
      })
    },
    async completeJob(jobID, data) {
      try {
        let complete = await this.$services.job.complete(jobID)

        if (complete) {
          try {
            data.invoiceNo = jobID
            let sell = await this.$services.sell.create(data)

            if (sell) {
              this.$buefy.snackbar.open({
                message: 'Başarılı bir şekilde muhasebeye gönderildi.',
                queue: false,
                type: 'is-success',
              })
              this.$emit('refreshJobs')
            }
          } catch (error) {
            this.$buefy.snackbar.open({
              message: 'Bir hata meydana geldi !',
              queue: false,
              type: 'is-danger',
            })
          }
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
    async removeJob(jobID) {
      try {
        let remove = await this.$services.job.remove(jobID)

        if (remove) {
          this.$buefy.toast.open('Servis Kaldırıldı !')
          this.$emit('refreshJobs')
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
