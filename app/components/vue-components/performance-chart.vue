<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import store from "../../store/index";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },

  data() {
    return {
      chartData: [],
      tooltipIconColor: "#17990E",
    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },
    tooltipIconStyle() {
      return `display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${this.tooltipIconColor}`;
    },
    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
          backgroundColor: "#16253F",
          padding: [10, 20],
          textStyle: {
            color: "#FFFFFF",
            fontWeight: "lighter",
          },
          extraCssText: "text-align: center;",
          formatter: `<span style='font-weight: bold;'>{b}</span>
            <br/>
            <span style='${this.tooltipIconStyle}'></span>
            {a}: {c}%`,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
          type: "value",
        },
        series: [
          {
            name: "Team Performance Index",
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lt: 50,
              color: "#FF0000",
            },
            {
              gte: 50,
              lte: 80,
              color: "#E8F229",
            },
            {
              gt: 80,
              lte: 100,
              color: "#17990E",
            },
          ],
        },
      };
    },

    xAxisData() {
      return store.state.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return store.state.chartData.map((item) => +item.performance * 100);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    log(e) {
      console.log(e);
    },
  },
  created() {
    store.dispatch("chartDataRequest");
  },
  mounted() {
    // Get current tooltip value to adjust the icon color
    this.$refs.chart.chart.on("showtip", (params) => {
      const currentData = this.yAxisData[params.dataIndex];
      if (0 < currentData && currentData < 50) {
        this.tooltipIconColor = "#FF0000";
      } else if (currentData >= 50 && currentData <= 80) {
        console.log("yellow");
        this.tooltipIconColor = "#E8F229";
      } else {
        this.tooltipIconColor = "#17990E";
      }
    });
  },
};
</script>
