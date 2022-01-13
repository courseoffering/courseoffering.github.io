<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false },
    timeout: { type: Number, default: 3000 },
    text: { type: String, required: true },
  },
  data() {
    return {
      snackbar: false,
    }
  },
  watch: {
    active(val, oldVal) {
      this.snackbar = val
    },
  },
}
</script>
