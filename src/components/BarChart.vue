<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  mounted() {
    fetch('https://localhost:7294/api/Job')
      .then((res) => res.json())
      .then((data) => {
        const jobsWithAverageSalary = data.map(
          (job1) =>
            ({ ...job1, averageSalary: (job1.maxSalary + job1.minSalary) / 2 })
        );
        const sortedJobs = jobsWithAverageSalary.sort((job1, job2) => {
          console.log(job1.averageSalary, job2.averageSalary)
          return job1.averageSalary > job2.averageSalary});
        const labels = sortedJobs.map(job => job.jobTitle);
        const datasets = sortedJobs.map(job => job.averageSalary)
        console.log(sortedJobs, 'sortedJobs in components/BarChart');
        console.log(labels, 'labels in components/BarChart');
        console.log(datasets, 'datasets in components/BarChart');
        this.chartData.labels = labels;
        this.chartData.datasets = [{ data: datasets, backgroundColor: '#5B6C5D', label: 'Average salary'}];
      });
  },
};
</script>
