<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <nuxt />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
  },
  computed: {
    menu() {
      return [
        'Genel',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Genel Görünüm',
          },
        ],
        'Özellikler',
        [
          {
            to: '/service',
            label: 'Servis',
            icon: 'account-cog',
          },
          {
            to: '/store',
            label: 'Depo',
            icon: 'storefront',
          },
          {
            to: '/date',
            label: 'Randevu',
            icon: 'calendar-range',
          },
          {
            label: 'Muhasebe',
            icon: 'bag-personal-outline',
            menu: [
              {
                to: '/purchase',
                icon: 'receipt',
                label: 'Alış Faturası',
              },
              {
                href: '/sell',
                icon: 'receipt',
                label: 'Satış Faturası',
              },
            ],
          },
          // {
          //   to: '/supplier',
          //   label: 'Tedarikçi',
          //   icon: 'human-handsup',
          // },
        ],
        'About',
        [
          {
            href: 'https://admin-one-nuxt.justboil.me',
            label: 'Premium Demo',
            icon: 'credit-card',
          },
          {
            href: 'https://justboil.me/bulma-admin-template/one-nuxt',
            label: 'About',
            icon: 'help-circle',
          },
        ],
      ]
    },
  },
  created() {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    })
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
}
</script>
