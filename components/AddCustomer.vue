<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Müşteri Ekle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3">
        <card-component>
          <form @submit.prevent="addCustomer">
            <div class="columns is-variable">
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="İsim" horizontal>
                  <b-input v-model="form.name" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Soyisim"
                  horizontal
                >
                  <b-input v-model="form.surname" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Cinsiyet"
                  class="has-check"
                  horizontal
                >
                  <div class="block">
                    <b-radio
                      v-model="form.gender"
                      name="name"
                      native-value="Erkek"
                    >
                      Erkek
                    </b-radio>
                    <b-radio
                      v-model="form.gender"
                      name="name"
                      native-value="Kadın"
                    >
                      Kadın
                    </b-radio>
                  </div>
                </b-field>
                <b-field label="Not" horizontal>
                  <b-input v-model="form.note" type="textarea" />
                </b-field>
              </div>
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="Email" horizontal>
                  <b-input
                    v-model="form.email"
                    type="email"
                    name="email"
                    required
                  />
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="Telefon"
                  horizontal
                >
                  <b-input
                    v-model="form.phone"
                    type="tel"
                    name="phone"
                    expanded
                    required
                  />
                </b-field>
                <b-field style="margin-bottom: 10px;" label="İl" horizontal>
                  <b-select
                    v-model="form.province"
                    placeholder="Müşteriyi seç"
                    required
                  >
                    <option
                      v-for="(il, index) in data"
                      :key="index"
                      :value="il"
                    >
                      {{ il }}
                    </option>
                  </b-select>
                </b-field>
                <b-field label="Adres" horizontal>
                  <b-input v-model="form.address" type="textarea" required />
                </b-field>
              </div>
            </div>
            <footer class="modal-card-foot">
              <b-button label="Ekle" native-type="submit" type="is-primary" />
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
      data: {
        '1': 'ADANA',
        '2': 'ADIYAMAN',
        '3': 'AFYONKARAHİSAR',
        '4': 'AĞRI',
        '5': 'AMASYA',
        '6': 'ANKARA',
        '7': 'ANTALYA',
        '8': 'ARTVİN',
        '9': 'AYDIN',
        '10': 'BALIKESİR',
        '11': 'BİLECİKK',
        '12': 'BİNGÖL',
        '13': 'BİTLİS',
        '14': 'BOLU',
        '15': 'BURDUR',
        '16': 'BURSA',
        '17': 'ÇANAKKALE',
        '18': 'ÇANKIRI',
        '19': 'ÇORUM',
        '20': 'DENİZLİ',
        '21': 'DİYARBAKIR',
        '22': 'EDİRNE',
        '23': 'ELAZIĞ',
        '24': 'ERZİNCAN',
        '25': 'ERZURUM',
        '26': 'ESKİŞEHİR',
        '27': 'GAZİANTEP',
        '28': 'GİRESUN',
        '29': 'GÜMÜŞHANE',
        '30': 'HAKKARİ',
        '31': 'HATAY',
        '32': 'ISPARTA',
        '33': 'MERSİN',
        '34': 'İSTANBUL',
        '35': 'İZMİR',
        '36': 'KARS',
        '37': 'KASTAMONU',
        '38': 'KAYSERİ',
        '39': 'KIRKLARELİ',
        '40': 'KIRŞEHİR',
        '41': 'KOCAELİ',
        '42': 'KONYA',
        '43': 'KÜTAHYA',
        '44': 'MALATYA',
        '45': 'MANİSA',
        '46': 'KAHRAMANMARAŞ',
        '47': 'MARDİN',
        '48': 'MUĞLA',
        '49': 'MUŞ',
        '50': 'NEVŞEHİR',
        '51': 'NİĞDE',
        '52': 'ORDU',
        '53': 'RİZE',
        '54': 'SAKARYA',
        '55': 'SAMSUN',
        '56': 'SİİRT',
        '57': 'SİNOP',
        '58': 'SİVAS',
        '59': 'TEKİRDAĞ',
        '60': 'TOKAT',
        '61': 'TRABZON',
        '62': 'TUNCELİ',
        '63': 'ŞANLIURFA',
        '64': 'UŞAK',
        '65': 'VAN',
        '66': 'YOZGAT',
        '67': 'ZONGULDAK',
        '68': 'AKSARAY',
        '69': 'BAYBURT',
        '70': 'KARAMAN',
        '71': 'KIRIKKALE',
        '72': 'BATMAN',
        '73': 'ŞIRNAK',
        '74': 'BARTIN',
        '75': 'ARDAHAN',
        '76': 'IĞDIR',
        '77': 'YALOVA',
        '78': 'KARABüK',
        '79': 'KİLİS',
        '80': 'OSMANİYE',
        '81': 'DÜZCE',
      },
      form: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        address: '',
        province: '',
        gender: '',
        note: '',
        companyID: this.$auth.user.companyID,
      },
    }
  },
  methods: {
    async addCustomer() {
      try {
        let customer = await this.$services.customer.create(this.form)

        if (customer) {
          this.$buefy.snackbar.open({
            message: 'Müşteri başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshCustomer')
          this.$emit('isntActive')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: error.response.data.error || 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
        console.log(error)
      }
    },
    close() {
      this.$emit('isntActive')
    },
  },
}
</script>

<style></style>
