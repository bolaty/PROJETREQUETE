import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | undefined;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  annotations: any;
};
export function barChartOptions(
  title: string,
  series: any[] = [],
  labels: string[] | string[][] = [],
  horizontal: boolean = false,
  legend: boolean = false
) {
  return {
    legend: {
      show: legend,
      horizontalAlign: 'left',
    },
    series: series,
    chart: {
      type: 'bar',
      height: series.length > 3 ? 450 : 350,
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      title: {
        text: title,
        offsetY: series.length > 3 ? -300 : -330,
      },
      categories: labels,
      tickAmount: 4,
      labels: {
        show: true,
        rotate: -35,
        rotateAlways: false,
        hideOverlappingLabels: false,
        style: {
          fontSize: '10px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
  } as Partial<ChartOptions>;
}

export function PieChartOptions(
  title: string,
  series: number[] = [],
  labels: string[] | string[][] = []
) {
  return {
    series: series,
    colors: ['#5B9BD5', '#ED7D31'],
    chart: {
      width: 450,
      type: 'pie',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return '';
      },
    },
    annotations: {
      title: {
        text: title,
        align: 'center',
        offsetY: -330,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  } as Partial<ChartOptionsPie>;
}
