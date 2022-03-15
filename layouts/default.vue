<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :href="item.href"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />

      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer />
      <!-- Language button -->
      <div class="text-center">
        <v-menu bottom offset-y open-on-hover rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey" large icon v-bind="attrs" v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-subheader>TRANSLATIONS</v-subheader>
            <v-list-item-group v-model="selectedLanguage" color="primary">
              <v-list-item
                v-for="(lang, index) in languages"
                :key="index"
                @click="switchLang(index)"
              >
                <v-list-item-title>{{ lang.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
      <!-- Language button -->
      <!-- Dark/Light Mode -->
      <v-btn color="grey" large icon @click="switchTheme">
        <v-icon>{{ 'mdi-brightness-6' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
<script data-goatcounter="https://courseoffering.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  </v-app>

</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    switchLang(i) {
      this.selectedLanguage = i
      this.$vuetify.lang.current = this.languages[i].code
      this.$vuetify.rtl = this.languages[i].rtl
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      selectedLanguage: 1,
      languages: [
        { name: 'عربي', code: 'ar', rtl: true },
        { name: 'English', code: 'en', rtl: false },
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-github',
          title: 'Source Code',
          href: 'https://github.com/courseoffering/courseoffering.github.io',
        },
        {
          icon: 'mdi-scale-balance',
          title: 'License',
          href: 'https://github.com/courseoffering/courseoffering.github.io/blob/main/LICENSE',
        },
      ],
      miniVariant: false,
      title: 'KFU Course Offering',
    }
  },
}
</script>
