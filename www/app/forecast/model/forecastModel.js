define([
	"underscore",
	"core/baseModel"
], 
function(_, BaseModel) {
	"use strict";
	
	return BaseModel.extend({
		urlRoot: "http://api.openweathermap.org/data/2.5/forecast/city?mode=json&units=metric&cnt=7&q=",
		
		fetch: function(cityName) {
			var model = this;
			
			this.makeRequest(this.url()+cityName, {dataType: "jsonp"})
				.done(function(response) {
					model.set(response);
					model.trigger("fetch:forecast:done");
				});
		}
		
	});
});
