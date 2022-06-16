import { defineComponent, h, PropType} from "vue";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: props.data,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
      });
  },
});
