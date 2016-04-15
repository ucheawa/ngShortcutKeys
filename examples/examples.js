(function () {
    function exampleController() {
        var vm = this;
        vm.sayHello = function () {
            console.log("Hello There!!!");
        }

        vm.sayWho = function () {
            alert("Doctor who say who");
        }
    }
    angular.module('ngShortcutKey.examples', ['ngShortcutKey.directive']);
    angular.module('ngShortcutKey.examples').controller('exampleController',exampleController);
})();