angular.module('espMultiSelect', [])

.directive('multiSelect', function($q) {
  return {
    restrict: 'E',
    require: ['ngModel', '^?form'],
    scope: {
      selectedLabel: "@",
      availableLabel: "@",
      displayAttr: "@",
      available: "=",
      model: "=ngModel"
    },
    templateUrl: "views/widgets/form/multiSelect/multiSelect.html",
    link: function(scope, iElement, iAttrs, ctrls) {

      var modelCtrl = ctrls[0],
          formCtrl = ctrls[1];
          
      scope.options = {
        available: [],
        current: []
      };

      if (!scope.model) {
        scope.model = [];
      }

      /* Filters out items in original that are also in toFilter. Compares by reference. */
      var filterOut = function(original, toFilter) {
        var filtered = [];
        angular.forEach(original, function(entity) {
          var match = false;
          for (var i = 0; i < toFilter.length; i++) {
            if (toFilter[i][iAttrs.displayAttr] == entity[iAttrs.displayAttr]) {
              match = true;
              break;
            }
          }
          if (!match) {
            filtered.push(entity);
          }
        });
        return filtered;
      };

      scope.refreshAvailable = function() {
        scope.available = filterOut(scope.available, scope.model);
        scope.options.available = [];
        scope.options.current = [];
      };

      scope.add = function(event) {
        scope.model = scope.model.concat(scope.options.available);
        scope.refreshAvailable();
      };
      scope.remove = function() {
        scope.available = scope.available.concat(scope.options.current);
        scope.model = filterOut(scope.model, scope.options.current);
        scope.refreshAvailable();
      };

      modelCtrl.$isEmpty = function(value) {
        return !value || !value.length;
      };

      //for the required constraint, have to validate the model is not a empty array

      if (iAttrs.ngRequired === "true") {
        var validator = function(value) {
          if (iAttrs.required && modelCtrl.$isEmpty(value)) {
            modelCtrl.$setValidity('required', false);
            return;
          } else {
            modelCtrl.$setValidity('required', true);
            return value;
          }
        };

        modelCtrl.$formatters.push(validator);
        modelCtrl.$parsers.unshift(validator);

        scope.$watch(scope.model, function() {
          validator(modelCtrl.$viewValue);
        });
      }

      scope.refreshAvailable();
    }
  };
});