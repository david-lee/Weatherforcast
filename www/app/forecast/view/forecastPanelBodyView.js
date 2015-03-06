define([
	"underscore",
	"core/baseView",
	"forecast/view/forecastDailyContentView",
	"text!forecast/template/forecastPanelBodyTemplate.html!strip",
    "i18n!core/nls/weather-nls",
	
	"moment",
    "bootstrap"
], 
function(_, BaseView, ForecastDailyContent, template, locale) {
	"use strict";
	
	var $prevSelectedBtn;
	
	return BaseView.extend({
		events: {
			"click .day-button": function(e) {
				$prevSelectedBtn && $prevSelectedBtn.removeClass("btn-primary");
				
				var day = $(e.target).addClass("btn-primary").data("day");
				$prevSelectedBtn = $(e.target);
				
				this._dailyForecastView.render(this.weatherList[this.weatherDates[day]]); 
			}
		},

        initialize: function (options) {
			this._dailyForecastView = new ForecastDailyContent();
			
			this.weatherDates = {
				day1: moment().format("YYYY-MM-DD"),
				day2: moment().add("days", 1).format("YYYY-MM-DD"),
				day3: moment().add("days", 2).format("YYYY-MM-DD"),
				day4: moment().add("days", 3).format("YYYY-MM-DD"),
				day5: moment().add("days", 4).format("YYYY-MM-DD"),
				day6: moment().add("days", 5).format("YYYY-MM-DD"),
				day7: moment().add("days", 6).format("YYYY-MM-DD")
			};
			
            BaseView.prototype.initialize.call(this, options, template, locale);
        },
        
        _beforeRender: function() {
        	var view = this;
        	
        	this.weatherList = {};
        	// initialize weather data
        	this.weatherList[this.weatherDates.day1] = [];
        	this.weatherList[this.weatherDates.day2] = [];
        	this.weatherList[this.weatherDates.day3] = [];
        	this.weatherList[this.weatherDates.day4] = [];
        	this.weatherList[this.weatherDates.day5] = [];
        	this.weatherList[this.weatherDates.day6] = [];
        	this.weatherList[this.weatherDates.day7] = [];
        	
        	var totalPressure = 0.0;
        	
        	// get weather data based on date
        	_.each(this.model.get("list"), function(val, key, list) {
        		var dt_txt = val.dt_txt.split(" ");
        		
        		// save only time part to display in a table based on time
        		val.dt_time = dt_txt[1];
        		
        		view.weatherList[dt_txt[0]].push(val);

	        	// accumulate all pressures
	        	totalPressure += val.main.pressure;
        	});
        	
        	// calculate average of pressures for the week
        	this.avgPressure = totalPressure / this.model.get("cnt");
        	
        	BaseView.prototype._beforeRender.apply(this, arguments);
        },
        
        _afterRender: function() {
        	BaseView.prototype._afterRender.apply(this, arguments);

        	// show today's weather by default
        	this.$(".day-button:first").trigger("click");
        },
        
        getViewModel: function() {
        	var city = this.model.get("city");
        	
        	return {
        		cityName: city.name + ", " + city.country,
        		avgPressure: this.avgPressure.toFixed(2),
        		day1Date: this.weatherDates.day1,
        		day2Date: this.weatherDates.day2,
        		day3Date: this.weatherDates.day3,
        		day4Date: this.weatherDates.day4,
        		day5Date: this.weatherDates.day5,
        		day6Date: this.weatherDates.day6,
        		day7Date: this.weatherDates.day7
        	};
        }
	});
});
