<template>
  <div>
    <!-- <ClassesCalendar /> -->
    <!-- <ClassesSelectedStats /> -->
    <ClassesFilters :departments="departments" />
    <ClassesList :classes="classes" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      departments: {
        Engineering: [
          {
            name: 'Electrical Engineering',
            abbrv: 'EE',
            sems: [...Array(9).keys()],
          },
          {
            name: 'Mechanical Engineering',
            abbrv: 'ME',
            sems: [...Array(9).keys()],
          },
          {
            name: 'Chemical   Engineering',
            abbrv: 'ChE',
            sems: [...Array(9).keys()],
          },
          {
            name: 'Civil      Engineering',
            abbrv: 'CE',
            sems: [...Array(9).keys()],
          },
        ],
        'Computer Science': [
          { name: 'Networking', abbrv: 'Net', sems: [...Array(9).keys()] },
        ],
      },
      classes: [
        {
          code: '00000',
          name: 'Course Name',
          crn: '01123',
          section: '03',
          days: 'MWT',
          time: '09:30-12:00',
          instructor: 'Ins Name',
          semster_index: 1,
        },
        {
          code: '00010',
          name: 'Course Name',
          crn: '01121',
          section: '03',
          days: 'MWT',
          time: '09:30-12:00',
          instructor: 'Ins Name',
          semster_index: 1,
        },
        {
          code: '00001',
          name: 'Course 2',
          crn: '01122',
          section: '01',
          days: 'MWT',
          time: '09:30-12:00',
          instructor: 'Ins Name2',
          semster_index: 2,
        },
      ],
    }
  },
}
</script>
