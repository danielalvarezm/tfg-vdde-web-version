/* eslint-disable @typescript-eslint/no-empty-function */
import { defineComponent, h, PropType } from 'vue'

import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
)

export default defineComponent({
  name: 'RadarChart',
  components: {
    Radar
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
      type: Array as PropType<Plugin<'radar'>[]>,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: transformToRadarData()
    }

    function transformToRadarData() {
      const transformedData = []
      for (let i = 0; i < props.data.length; i++) {
        transformedData.push({
          label: props.data[i].label,
          backgroundColor: props.data[i].backgroundColor.replace('1)', '0.3)'),
          borderColor: props.data[i].backgroundColor,
          pointBackgroundColor: props.data[i].backgroundColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: props.data[i].backgroundColor,
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
      h(Radar, {
        chartData,
        chartOptions,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
