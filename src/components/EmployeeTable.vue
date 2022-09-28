<template>
  <div>
    <b-table hover :items="employees" :fields="fields" striped responsive="sm" :tbody-tr-class="rowClass">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>employee number:</b></b-col>
            <b-col>{{ row.item.employeeId }}</b-col>
            <b-col sm="3" class="text-sm-right"><b>phoneNumber:</b></b-col>
            <b-col>{{ row.item.phoneNumber }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>hireDate:</b></b-col>
            <b-col>{{ new Date(row.item.hireDate).toLocaleDateString() }}</b-col>
            <b-col sm="3" class="text-sm-right"><b>salary:</b></b-col>
            <b-col>{{ row.item.salary }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>jobId:</b></b-col>
            <b-col>{{ row.item.jobId }}</b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="mb-2" v-if="row?.item?.manager">
            <b-col sm="3" class="text-sm-right"><b>manager:</b></b-col>
            <b-col>{{`${row.item.manager.firstName} ${row.item.manager.lastName}`}}</b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    msg: String,
  },
  data() {
    return {
      fields: [
        'firstName',
        'lastName',
        'show_details',
      ],
      employees: [],
      highlightManagers: false,
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return;
      if (item.inverseManager?.length > 0 && this.highlightManagers) return 'table-success';
    },
  },
  mounted() {
    fetch('https://localhost:7294/api/Employee')
      .then((res) => res.json())
      .then((data) => (this.employees = data));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
