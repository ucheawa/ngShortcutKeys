(function (angular) {
    function shortcutKeysDirective($window, keyCodes) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                var modifierKeys = parseModifiers(attrs.skModifiers);

                $window.addEventListener('keydown', function (event) {
                    if (modifierKeysActive(event) && shortcutKeyPressed(event.keyCode) && !isDeactivated()) {
                        preventDefault(event);
                        elem.triggerHandler('click');
                    }
                });

                function shortcutKeyPressed(keyCode) {
                    return keyCodes[keyCode] == attrs.ngShortcutKeys;
                }

                function parseModifiers(modifiers) {
                    return !!modifiers ? modifiers.split('+') : [];
                }

                function modifierKeysActive(event) {
                    var active = true;
                    modifierKeys.forEach(function (modifierProp) {
                        active = active && event[modifierProp + "Key"];
                    });
                    return active;
                }

                function isDisabled() {
                    return !!attrs.ngDisabled && scope.$eval(attrs.ngDisabled);
                }

                function isHidden() {
                    return (!!attrs.ngHide && scope.$eval(attrs.ngHide))
                        || (!!attrs.ngShow && !scope.$eval(attrs.ngShow));
                }

                function isDeactivated() {
                    var deactivate = !!attrs.deactivateOn && scope.$eval(attrs.deactivateOn);
                    return deactivate || isDisabled() || isHidden();
                }

                function preventDefault(event) {
                    if (!!attrs.skPreventDefault && scope.$eval(attrs.skPreventDefault))
                        event.preventDefault();
                }


            }
        }
    }

    shortcutKeysDirective.$inject = ['$window', 'keyCodes'];
    angular.module('ngShortcutKey.directive', []);
    angular.module('ngShortcutKey.directive').directive('ngShortcutKeys', shortcutKeysDirective);
})(angular);