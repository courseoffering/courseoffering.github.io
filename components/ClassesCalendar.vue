<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-calendar
        ref="calendar"
        :now="today"
        :value="today"
        first-interval="7"
        interval-count="16"
        type="week"
        :events="events"
      ></v-calendar>
      <!-- TODO: dynamic interval count   -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: { classes: { type: Array, default: () => [] } },
  data() {
    return { today: '2022-05-0' }
  },
  computed: {
    events() {
      let today = this.today
      let a = this.classes.map((c) => {
        return c.days.map((d) => {
          return {
            //MAGIC!
            name: c.name,
            start: time(today + (1 + d), c.time, 0),
            end: time(today + (1 + d), c.time, 1),
          }
        })
      })
      return a.flat(1)
    },
  },
}
//MAGIC!
// range = "1030-1430", i=0> start, i=1> end
function time(today, range, i) {
  return (
    today +
    ' ' +
    range.slice(0 + 5 * i, 2 + 5 * i) +
    ':' +
    range.slice(2 + 5 * i, 4 + 5 * i)
  )
}
</script>
<style>
.v-calendar-daily__scroll-area {
  overflow-y: auto;
}
</style>
