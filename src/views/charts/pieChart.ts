/* eslint-disable @typescript-eslint/no-empty-function */
import { defineComponent, h, PropType } from 'vue'

import { Pie } from 'vue-chartjs'
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
  name: 'PieChart',
  components: {
    Pie
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
      type: Array as PropType<Plugin<'pie'>[]>,
      default: () => []
    }
  },
  setup(props) {
    // https://htmlcolorcodes.com/es/nombres-de-los-colores/
    const backgroundColors = [
      '#E6E6FA',
      '#DDA0DD',
      '#BA55D3',
      '#6A5ACD',
      '#8B008B',
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
      '#00FFFF', // A partir de aquí pongo repetidos porque puede que haya más años
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
      '#E6E6FA',
    ]

    const chartData = {
      labels: props.labels,
      datasets: transformToPieData()
    }

    function transformToPieData() {
      const transformedData = []
      for (let i = 0; i < props.data.length; i++) {
        transformedData.push({
          backgroundColor: backgroundColors[i],
          data: props.data[i].data
        })
      }
      return transformedData
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Pie, {
        chartData,
        chartOptions,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
