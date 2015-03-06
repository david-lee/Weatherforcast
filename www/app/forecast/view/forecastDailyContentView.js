define([
	"underscore",
	"core/baseView",
	"text!forecast/template/forecastDailyContentTemplate.html!strip",
    "i18n!core/nls/weather-nls",
	
	"moment",
    "bootstrap",
    "jquery.dataTables",
    "jquery.flot"
], 
function(_, BaseView, template, locale) {
	"use strict";
	
	return BaseView.extend({
		events: {
		},

        initialize: function (options) {
            BaseView.prototype.initialize.call(this, options, template, locale);
        },
        
        render: function(weatherList) {
        	this.weatherList = weatherList;
        	
        	BaseView.prototype.render.apply(this, arguments);
        	        	
        	return this;        	
        },
        
        _afterRender: function() {
        	var view = this;
        	BaseView.prototype._afterRender.apply(this, arguments);

        	setTimeout(function() {
        		view.$el.appendTo(".forecast-content");
        		var data = _.map(view.weatherList, function(weather) {
        				return [weather.dt_time.split(":")[0], weather.main.temp];
         			});
         			
        		$.plot(view.$(".js-temp-chart"), [data], {
			        series: {
			            lines: { show: true },
			            points: {
			                radius: 3,
			                show: true,
			                fill: true
			            },
			        },
        		});
        		
        	}, 10);        	
        },
        
        getViewModel: function() {
        	return {
        		weatherList: this.weatherList
        	};	
        }
	});
});
