(function () {
    function exampleController() {
        var vm = this;
        vm.sayHello = function () {
            vm.msg = "saying hello";
        }

        vm.sayWho = function () {
            vm.msg = "The doctor prints bad wolf!!";
        }
    }
    angular.module('ngShortcutKey.examples', ['ngShortcutKey']);
    angular.module('ngShortcutKey.examples').controller('exampleController',exampleController);
})();