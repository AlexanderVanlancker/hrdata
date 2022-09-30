<template>
  <div>
    {{ graphedEmployees }}
    <p> </p>
    {{ graphedEmployees.find(e => e.id === 100) }}
    <p> </p>
    {{ !graphedEmployees.find(e => e.id === 100) }}

    <b-input-group class="search" size="lg">
      <b-input-group-prepend is-text>
        <b-icon icon="search" font-scale="1"></b-icon>
      </b-input-group-prepend>
      <b-form-input v-model="searchTerm" placeholder="Search..."></b-form-input>
    </b-input-group>

    <b-table
      hover
      :items="visibleEmployees"
      :fields="fields"
      striped
      responsive="sm"
      :tbody-tr-class="rowClass"
    >
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>employee number:</b></b-col>
            <b-col sm="3">{{ row.item.employeeId }}</b-col>

            <b-col sm="2" class="text-sm-left"><b>phoneNumber:</b></b-col>
            <b-col class="text-sm-left">
              <span v-if="editMode !== row.item.employeeId">
                {{ row.item.phoneNumber }}
              </span>
              <input
                v-if="editMode === row.item.employeeId"
                type="text"
                :value="row.item.phoneNumber"
              />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>hireDate:</b></b-col>
            <b-col sm="3">
              <span v-if="editMode !== row.item.employeeId">
                {{ new Date(row.item.hireDate).toLocaleDateString() }}
              </span>
              <input
                v-if="editMode === row.item.employeeId"
                v-model="employee.hireDate"
                type="datetime"
              />
            </b-col>

            <b-col sm="2" class="text-sm-left"><b>salary:</b></b-col>
            <b-col class="text-sm-left">
              <span v-if="editMode !== row.item.employeeId">
                {{ row.item.salary }}
              </span>
              <input
                v-if="editMode === row.item.employeeId"
                type="text"
                :value="row.item.salary"
              />
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>jobId:</b></b-col>
            <b-col sm="3">
              <span v-if="editMode !== row.item.employeeId">
                {{ row.item.jobId }}
              </span>
              <input
                v-if="editMode === row.item.employeeId"
                type="text"
                :value="row.item.jobId"
              />
            </b-col>
            <b-col sm="3"> </b-col>
          </b-row>
          <b-row class="mb-2" v-if="row?.item?.manager">
            <b-col sm="3" class="text-sm-right"><b>manager:</b></b-col>
            <b-col>{{
              `${row.item.manager.firstName} ${row.item.manager.lastName}`
            }}</b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>

          <b-button
            v-if="editMode !== row.item.employeeId"
            size="sm"
            @click="editDetials(row.item.employeeId)"
          >
            Edit Details
          </b-button>
          <b-button
            size="sm"
            v-if="editMode !== row.item.employeeId"
            @click="graphEmployee(row.item)"
          >
            Add to graph
          </b-button>
          <b-button
            variant="success"
            :v-if="isgraphed(row.item.employeeId)"
            size="sm"
            @click="degraphEmployee(row.item.employeeId)"
            >Remove from graph</b-button
          >
          <b-button
            variant="success"
            v-if="editMode === row.item.employeeId"
            size="sm"
            @click="editMode = 0"
            >Save Details</b-button
          >
          <b-button
            variant="danger"
            v-if="editMode === row.item.employeeId"
            size="sm"
            @click="editMode = 0"
            >Discard changes</b-button
          >
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import 'vue2-datepicker/index.css';

export default {
  name: 'EmployeeTable',
  components: {
  },
  props: {
    msg: String,
  },
  data() {
    return {
      fields: [
        { key: 'job.jobTitle', label: 'Job Title', sortable: true },
        'firstName',
        'lastName',
        'show_details',
      ],
      employees: [],
      employee: {
        hireDate: '',
      },
      highlightManagers: false,
      editMode: 0,
      searchTerm: '',
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return;
      if (item.inverseManager?.length > 0 && this.highlightManagers)
        return 'table-success';
    },
    graphEmployee(employee) {
      this.$store.commit('graphEmployee', {
        id: employee.employeeId,
        name: `${employee.firstName} ${employee.lastName}`,
        job: employee.job.jobTitle,
        salary: employee.salary,
      });
    },
    isgraphed(id){
      this?.$store?.state?.graphedEmployees.find(e => {
              e.id === id;
              console.log(this?.$store?.state?.graphedEmployees, e.id, id);
              return true;
            }); return false;},
    degraphEmployee(id) {
      this.$store.commit('degraphEmployee', id);
      this.isgraphed(id);
      console.log('first')
    },
    editDetials(employeeId) {
      this.editMode = employeeId;
      const selectedEmployee = this.employees.find(
        (e) => e.employeeId === employeeId
      );
      this.employee = selectedEmployee;
    },
  },
  mounted() {
    fetch('https://localhost:7294/api/Employee')
      .then((res) => res.json())
      .then((data) => (this.employees = data));
  },
  computed: {
    // a computed getter
    visibleEmployees: function () {
      // `this` points to the vm instance
      return this.searchTerm
        ? this.employees.filter(
            (e) =>
              e.job.jobTitle
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
              e.firstName
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
              e.lastName
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
              `${e.firstName} ${e.lastName}`
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
          )
        : this.employees;
    },
    graphedEmployees: function(){return this?.$store?.state?.graphedEmployees},
    // storedEmployees: this.$store.state.graphedEmployees,/
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
.btn {
  margin: 0 4px;
}
.search {
  margin-bottom: 1rem;
}
</style>
