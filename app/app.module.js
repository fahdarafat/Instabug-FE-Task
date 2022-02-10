import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import 'angular-sanitize';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, { locale });
import NotFoundPageComponent from './pages/not-found-page.vue';
import Filters from './components/vue-components/filters.vue';

angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
  'ngSanitize',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});

angular.module('appModule').directive('vFilters', (createVueComponent) => {
  return createVueComponent(Vue.component('filters', Filters));
});

angular.module('appModule').directive('vNotFoundPage', (createVueComponent) => {
  return createVueComponent(Vue.component('notFoundPageComponent', NotFoundPageComponent));
});
