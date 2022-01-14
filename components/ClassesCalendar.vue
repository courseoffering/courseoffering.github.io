<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-sheet>
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          first-interval="7"
          :interval-count="intervalCount"
          type="week"
          :events="events"
          :event-color="getEventColor"
          @click:event="showEvent"
        >
          <template v-slot:event="{ event, eventParsed }">
            <v-card
              :key="event.crn"
              :title="event.name"
              :color="getEventColor(event)"
              height="100%"
              class="text-center"
              tile
            >
              {{ event.name }}
              <!-- <v-chip> {{ event.start)}} </v-chip> -->
              <!-- <v-chip> {{ event.end)}} </v-chip> -->
            </v-card>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card min-width="350px" flat>
            <v-toolbar :color="getEventColor(selectedEvent)">
              <v-btn
                @click="
                  $emit('class:delete', selectedEvent)
                  selectedOpen = false
                "
                icon
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon> <v-icon>mdi-heart</v-icon> </v-btn> -->
              <!-- <v-btn icon> <v-icon>mdi-dots-vertical</v-icon> </v-btn> -->
            </v-toolbar>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{{ selectedEvent.name }}</td>
                    </tr>

                    <tr>
                      <td>Code:</td>
                      <td>{{ selectedEvent.code }}</td>
                    </tr>

                    <tr>
                      <td>CRN:</td>
                      <td>{{ selectedEvent.crn }}</td>
                    </tr>

                    <tr>
                      <td>Start:</td>
                      <td>{{ selectedEvent.start }}</td>
                    </tr>

                    <tr>
                      <td>End:</td>
                      <td>{{ selectedEvent.end }}</td>
                    </tr>

                    <tr>
                      <td>Section:</td>
                      <td>{{ selectedEvent.section }}</td>
                    </tr>

                    <tr>
                      <td>Instructor:</td>
                      <td>{{ selectedEvent.instructor }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: { classes: { type: Array, default: () => [] } },
  data() {
    return {
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange'],

      today: '2022-05-0',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    }
  },
  methods: {
    getEventColor(e) {
      // in case nothing is selected yet
      if (!e.name) {
        return null
      }
      //generate 'random' color based on name of the course
      let rand_number = e.name
        .split('')
        .map((c) => c.codePointAt(0))
        .reduce((a, b) => a + b)
      let l = this.colors.length
      return this.colors[rand_number % l]
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        let other_data = this.classes.find((c) => c.name == event.name)
        this.selectedEvent = { ...event, ...other_data }

        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
  },
  computed: {
    intervalCount() {
      let intervals = this.events.map((e) => e.end.slice(11, 13))
      intervals = intervals.map(Number)

      if (intervals.length == 0) {
        return 5
      } else {
        return Math.max(...intervals) - 5
      }
    },
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
