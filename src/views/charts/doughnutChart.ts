/* eslint-disable @typescript-eslint/no-empty-function */
import { defineComponent, h, PropType } from 'vue'

import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<any>,
      required: true,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'doughnut'>[]>,
      default: () => []
    }
  },
  setup(props) {
    const backgroundColors = [
        '#E6E6FA',
        '#DDA0DD',
        '#BA55D3',
        '#6A5ACD',
        '#8B008B',
        '#4B0082',
        '#483D8B',
        '#0000CD',
        '#4169E1',
        '#6495ED',
        '#1E90FF',
        '#ADD8E6',
        '#B0C4DE',
        '#4682B4',
        '#5F9EA0',
        '#00CED1',
        '#7FFFD4',
        '#AFEEEE',
        '#E0FFFF',
        '#00FFFF',
      ]

    const chartData = {
        labels: props.labels,
        datasets: [
          {
            backgroundColor: backgroundColors,
            data: props.data[0].data
          }
        ]
      }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
