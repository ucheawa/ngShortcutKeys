(function (angular) {
    function shortcutKeysDirective($window, keyCodes) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                var modifierKeys = parseModifiers(attrs.skModifiers);

                $window.addEventListener('keydown', function (event) {
                    if (modifierKeysActive(event) && shortcutKeyPressed(event.keyCode)) {
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
                    return false;//TODO always return false for now
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