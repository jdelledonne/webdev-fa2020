function init($uiRouter) {
    var Visualizer = window['ui-router-visualizer'].Visualizer; 
    var plugininstance = $uiRouter.plugin(Visualizer); 
}

angular
    .module('common')
    .run(init)