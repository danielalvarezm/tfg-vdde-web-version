/* eslint-disable @typescript-eslint/no-empty-function */
import { defineComponent, h, PropType } from 'vue'

import { PolarArea } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

export default defineComponent({
  name: 'PolarAreaChart',
  components: {
    PolarArea
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
      type: Array as PropType<Plugin<'polarArea'>[]>,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
        labels: props.labels,
        datasets: transformToAreaPolarData()
      }

    function transformToAreaPolarData() {
        const transformedData = []
        for (let i = 0; i < props.data.length; i++) {
          transformedData.push({
            label: props.data[i].label,
            backgroundColor: props.data[i].backgroundColor.replace('1)', '0.3)'),
            pointBackgroundColor: props.data[i].backgroundColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: props.data[i].backgroundColor,
            data: props.data[i].data
          })
          console.log(transformedData[i].backgroundColor)
        }
        return transformedData
      }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(PolarArea, {
        chartData,
        chartOptions,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
