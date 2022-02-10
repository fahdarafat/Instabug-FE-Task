angular
  .module('appModule')
  .filter('highlight', function ($sce) {
    return function (input, searchText) {
      if (!searchText) {
        return input;
      }
      const re = new RegExp(searchText, 'g');
      const text = re.test(input) ? input.replace(re, `<span class="c-users-list__highlight">${searchText}</span>`) : input;
      return $sce.trustAsHtml(text);
    };
  })
  .controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.currentPage = 0;
  homePageVm.pages = 1;
  homePageVm.employees = [];
  homePageVm.loading = false;
  homePageVm.disabled = false;
  homePageVm.searchText = '';

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
  homePageVm.loadMore = () => {
    if (homePageVm.currentPage < homePageVm.pages) {
      homePageVm.loading = true;
      Employees.loadMoreEmployees(homePageVm.currentPage).then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.pages = data.pages;
        homePageVm.currentPage++;
        if (homePageVm.currentPage === homePageVm.pages) {
          homePageVm.disabled = true;
        }
        homePageVm.loading = false;
      });
    }
  };
  homePageVm.log = (searchText) => {
    homePageVm.searchText = searchText;
  };
  homePageVm.clearText = () => {
    homePageVm.searchText = '';
  };
}
