angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.currentPage = 1;
  homePageVm.pages = 1;
  homePageVm.employees = [];
  homePageVm.loading = false;
  homePageVm.disabled = false;

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        console.log(data);
      });
  }
  homePageVm.loadMore = () => {
    if (homePageVm.currentPage <= homePageVm.pages) {
      homePageVm.loading = true;
      Employees.loadMoreEmployees(homePageVm.currentPage).then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.pages = data.pages;
        homePageVm.currentPage++;
        homePageVm.loading = false;
      });
    } else {
      homePageVm.disabled = true;
    }
  };
}
