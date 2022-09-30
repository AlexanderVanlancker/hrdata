<template>
  <div>
    <ApexChart
      ref="chart"
      width="1000"
      type="scatter"
      :options="chartOptions"
      :series="series"
      :xaxis="xaxis"
    ></ApexChart>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  data() {
    return {
      series: [
        { name: 'Estimate', type: 'column', data: [10, 15, 4, 12, 17] },
        { name: 'Actual', data: [12, 20, 12, 5, 12] },
      ],

      chartOptions: {
        chart: {
          type: 'scatter',
          height: 550,
          zoom: {
            enabled: false,
            type: 'xy',
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: 'category',
        },
        legend: {
          height: 40,
        },
      },
      xaxis: {
          type: 'category',
        },
    };
  },
  mounted() {
    fetch('https://localhost:7294/api/Job')
      .then((res) => res.json())
      .then((data) => {
        const jobsWithAverageSalary = data.map((job1) => ({
          ...job1,
          averageSalary: (job1.maxSalary + job1.minSalary) / 2,
        }));
        const sortedJobs = jobsWithAverageSalary.sort((job1, job2) => {
          return job1.averageSalary > job2.averageSalary;
        });
        const labels = sortedJobs.map((job) => job.jobTitle);
        const datasets = sortedJobs.map((job) => job.averageSalary);

        const toGraph = this.$store.state.graphedEmployees;
        const circles = sortedJobs.map((job) => {
          const filteredToGraph = toGraph.filter((e) => e.job === job.jobTitle);
          let res = null;

          if (filteredToGraph) {
            res = filteredToGraph.map((e) => e.salary);
          }
          return res;
        });
        this.$store.state.graphedEmployees?.map((e) => e.salary);
        this.$refs.chart.updateSeries([
          { name: 'Average salary', type: 'column', data: datasets },
          { name: 'Salary', data: circles },
          { name: 'fdsafdsaf', data: [{x:labels[2], y:1239}] },
        ]);
        this.$refs.chart.updateOptions({
          xaxis: {
            type: 'category',
            categories: labels,
            labels: {
              formatter: function (value) {
                return value;
              },
              style: {
                fontSize: '10px',
              },
            },
            tickPlacement: 'between',
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value;
              },
              style: {
                fontSize: '10px',
              },
            },
          },
        });
      });
  },
};
</script>
