<template>
  <div>
    <card-component title="Kullanıcılar Listesi">
      <b-table
        :checked-rows.sync="checkedRows"
        :checkable="checkable"
        :loading="isLoading"
        :paginated="paginated"
        :per-page="perPage"
        :striped="true"
        :hoverable="true"
        :data="users"
      >
        <template slot-scope="props">
          <b-table-column label="ID" field="_id" sortable>
            {{ props.row._id }}
          </b-table-column>
          <b-table-column label="İsim" field="name" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column label="Soyisim" field="surname" sortable>
            {{ props.row.surname }}
          </b-table-column>
          <b-table-column label="E-posta" field="email" sortable>
            {{ props.row.email }}
          </b-table-column>
          <b-table-column label="Rol" field="roleID" sortable>
            {{ props.row.roleID.type }}
          </b-table-column>
          <b-table-column custom-key="actions" class="is-actions-cell">
            <div class="buttons is-right">
              <button
                :disabled="props.row.roleID._id == '61223239eeadc037000374b8'"
                class="button is-small is-danger"
                type="button"
                @click="confirmDelete(props.row.name, props.row._id)"
              >
                <b-icon icon="trash-can" size="is-small" />
              </button>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </card-component>
  </div>
</template>

<script>
import CardComponent from '~/components/CardComponent.vue'
export default {
  components: { CardComponent },
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
      users: [],
    }
  },
  async fetch() {
    try {
      let users = await this.$axios.get(
        `/user/get/${this.$auth.user.companyID._id}`
      )

      if (users) this.users = users.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    confirmDelete(name, id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting account',
        message: `'<b>${name}</b>' isimli kullanıcıyı silmek istediğinden emin misin ?`,
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeUser(id),
      })
    },
    async removeUser(id) {
      try {
        let remove = await this.$axios.delete(`/user/remove/${id}`)

        if (remove) {
          this.$buefy.toast.open('Kullanıcı Kaldırıldı !')
          this.$fetch()
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
  },
}
</script>
