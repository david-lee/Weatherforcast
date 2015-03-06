define([
	"underscore",
	"core/baseView",
	"forecast/model/forecastModel",
	"forecast/view/forecastPanelBodyView",
	"text!forecast/template/forecastPanelTemplate.html!strip",
    "i18n!core/nls/weather-nls",
	
    "bootstrap"
], 
function(_, BaseView, ForecastModel, ForecastPanelBodyView, template, locale) {
	"use strict";
	
	return BaseView.extend({
		events: {
			"keypress .js-city-search": function (e) {
                if (e.which === 13) {
                    var $input = $(e.target);
                    
                    $(".progress").show();
                	this.model.clear();
                    this.model.fetch($input.val());
                }
            }
		},

        initialize: function (options) {
        	var view = this;
        	
        	this.model = new ForecastModel();
        	
        	this._panelBody = new ForecastPanelBodyView();

			this.listenTo(this.model, "fetch:forecast:done", function() {
				view._panelBody.model = view.model;
				view._panelBody.render().$el.appendTo(".panel-body");
				$(".progress").hide();
			});
        	
            BaseView.prototype.initialize.call(this, options, template, locale);
        },
        
        render: function() {
        	BaseView.prototype.render.apply(this, arguments);
        	
        	return this;
        }
	});
});
