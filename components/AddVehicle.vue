<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Araç Ekle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3">
        <card-component>
          <div class="columns is-variable">
            <div class="column">
              <b-field style="margin-bottom: 10px;" label="Tip" horizontal>
                <b-select placeholder="Müşteriyi seç" required>
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Marka" horizontal>
                <b-select placeholder="Müşteriyi seç" required>
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Model" horizontal>
                <b-select placeholder="Müşteriyi seç" required>
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Yıl" horizontal>
                <b-input />
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Km" horizontal>
                <b-input />
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Hp" horizontal>
                <b-input />
              </b-field>
              <b-field label="Renk" horizontal>
                <b-input />
              </b-field>
            </div>
            <div class="column">
              <b-field style="margin-bottom: 10px;" label="Motor No" horizontal>
                <b-input type="email" name="email" required />
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Şasi No" horizontal>
                <b-input type="email" name="email" required />
              </b-field>
              <b-field
                style="margin-bottom: 10px;"
                label="Vites Tipi"
                horizontal
              >
                <b-select placeholder="Vites Tipi" required>
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
              </b-field>
              <b-field
                style="margin-bottom: 10px;"
                label="Yakıt Tipi"
                horizontal
              >
                <b-select placeholder="Müşteriyi seç" required>
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
              </b-field>
              <b-field
                style="margin-bottom: 10px;"
                label="Kasa Tipi"
                horizontal
              >
                <b-select placeholder="Müşteriyi seç" required>
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
        </card-component>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Ekle" type="is-primary" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: '',
        brand: '',
        model: Number,
        km: Number,
        engineNo: '',
        chassisNo: '',
        color: '',
        gearType: '',
        fuelType: '',
        caseType: '',
        hp: Number,
      },
    }
  },
  methods: {
    close() {
      this.$emit('isntActive')
    },
  },
}
</script>

<style></style>
