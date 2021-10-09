<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Ürün Ekle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3">
        <card-component>
          <form @submit.prevent="addProduct">
            <div class="columns is-variable">
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="İsim" horizontal>
                  <b-input v-model="form.name" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Stok No"
                  horizontal
                >
                  <b-input v-model="form.stockNo" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Barkod No"
                  horizontal
                >
                  <b-input v-model="form.barcodeNo" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Ürün miktarı"
                  horizontal
                >
                  <b-input
                    type="number"
                    v-model="form.quantity"
                    name="name"
                    required
                  />
                </b-field>
                <b-field label="Kategori" horizontal>
                  <b-select
                    v-model="form.categoryID"
                    placeholder="Müşteriyi seç"
                    required
                  >
                    <option
                      v-for="(category, index) in categories"
                      :key="index"
                      :value="category._id"
                    >
                      {{ category.name }}
                    </option>
                  </b-select>
                  <b-button @click="isActive = true">
                    Kategori Ekle
                  </b-button>
                  <div v-if="isActive" class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                      <header class="modal-card-head">
                        <p class="modal-card-title">Kategori Ekle</p>
                        <button
                          type="button"
                          class="delete"
                          @click="isActive = false"
                        />
                      </header>
                      <section class="modal-card-body">
                        <b-field
                          style="margin-bottom: 10px;"
                          label="Kategori İsmi"
                          horizontal
                        >
                          <b-input
                            v-model="categoryName"
                            name="name"
                            required
                          />
                        </b-field>
                      </section>
                      <footer class="modal-card-foot">
                        <b-button
                          @click="addCategory"
                          label="Ekle"
                          type="is-primary"
                        />
                      </footer>
                    </div>
                  </div>
                </b-field>
              </div>
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="Fiyat" horizontal>
                  <p class="control">
                    <span class="select">
                      <select v-model="currency" disabled>
                        <option>₺</option>
                        <option>$</option>
                        <option>£</option>
                        <option>€</option>
                      </select>
                    </span>
                  </p>
                  <p class="control">
                    <input v-model="form.price" class="input" type="number" />
                  </p>
                </b-field>

                <b-field
                  style="margin-bottom: 10px;"
                  label="Kdv Oranı"
                  horizontal
                >
                  <b-input v-model="form.kdv" name="name" type="number" />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="KDV"
                  class="has-check"
                  horizontal
                >
                  <div class="block">
                    <b-radio
                      v-model="form.kdv_is_included"
                      name="name"
                      native-value="true"
                    >
                      Dahil
                    </b-radio>
                    <b-radio
                      v-model="form.kdv_is_included"
                      name="name"
                      native-value="false"
                    >
                      Dahil değil
                    </b-radio>
                  </div>
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="İndirimli fiyat"
                  horizontal
                >
                  <b-input v-model="form.discountedPrice" type="number" />
                </b-field>
                <b-field horizontal>
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                </b-field>
              </div>
            </div>
            <footer class="modal-card-foot">
              <b-button
                label="Ekle"
                native-type="submit"
                :disabled="disable"
                type="is-primary"
              />
            </footer>
          </form>
        </card-component>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currency: '₺',
      form: {
        name: '',
        stockNo: '',
        barcodeNo: '',
        photo: '',
        kdv: '',
        price: '',
        kdv_is_included: Boolean,
        discountedPrice: '',
        quantity: '',
        storeID: this.$route.params.id,
        categoryID: '612742bc0661682d8402f167',
        companyID: '',
      },
      disable: false,
      file: '',
      categoryName: '',
      categories: [],
      isActive: false,
    }
  },
  async created() {
    try {
      let categories = await this.$services.product.getCategory(
        this.$auth.user.companyID._id
      )

      this.categories = categories.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async addProduct() {
      this.disable = true
      this.form.companyID = this.$auth.user.companyID._id
      try {
        let product = await this.$services.product.create(this.form)

        if (product) {
          this.$buefy.snackbar.open({
            message: 'Ürün başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshProduct')
          if (this.file) {
            this.upload(product.data._id)
          }
          this.$emit('isntActive')
          this.disable = false
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
    async upload(productID) {
      let formData = new FormData()
      formData.append('file', this.file)
      this.$axios
        .put(`/product/upload/${productID}`, formData)
        .then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          this.$buefy.snackbar.open({
            message: 'Dosya yüklenirken bir hata meydana geldi !',
            queue: false,
            type: 'is-danger',
          })
        })
    },
    async addCategory() {
      try {
        var form = {
          name: this.categoryName,
          companyID: this.$auth.user.companyID._id,
        }
        let category = await this.$services.product.createCategory(form)

        if (category) {
          this.$buefy.snackbar.open({
            message: 'Kategori başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.getCategory()
          this.isActive = false
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
    async getCategory() {
      try {
        let categories = await this.$services.product.getCategory(
          this.$auth.user.companyID._id
        )

        this.categories = categories.data
      } catch (error) {
        console.log(error)
      }
    },
    close() {
      this.$emit('isntActive')
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
  },
}
</script>

<style></style>
