angular.module('templates-common', ['common/form/multiselect/multiSelect.tpl.html']);

angular.module("common/form/multiselect/multiSelect.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/form/multiselect/multiSelect.tpl.html",
    "<div class=\"multiSelect\">\n" +
    "    <div class=\"select from\">\n" +
    "        <label class=\"control-label\" for=\"multiSelectAvailable\">{{ availableLabel }} ({{ available.length }})</label>\n" +
    "        <select ng-model=\"options.available\" multiple size=\"5\" ng-options=\"e as e[displayAttr] for e in available\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"select buttons\">\n" +
    "        <button type=\"button\" class=\"btn mover toRight\" ng-click=\"add()\" title=\"Add selected\" ng-disabled=\"options.available.length == 0\"> <i class=\"glyphicon glyphicon-arrow-right\"></i>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn mover toLeft\" ng-click=\"remove()\" title=\"Remove selected\" ng-disabled=\"options.current.length == 0\"> <i class=\"glyphicon glyphicon-arrow-left\"></i>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"select to\">\n" +
    "        <label class=\"control-label\" for=\"multiSelectSelected\">{{ selectedLabel }} ({{ model.length }})</label>\n" +
    "        <select ng-model=\"options.current\" multiple size=\"5\" ng-options=\"e as e[displayAttr] for e in model\"></select>\n" +
    "    </div>\n" +
    "</div>");
}]);
