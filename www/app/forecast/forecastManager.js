define([
	"forecast/view/forecastPanelView"
], 
function(ForecastPanelView) {
	"use strict";

	new ForecastPanelView().render().$el.appendTo('#content');
});
