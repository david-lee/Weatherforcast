define([
	"backbone"
], 
function (Backbone) {
    "use strict";

    return Backbone.Model.extend({
        makeRequest: function(url, data, type) {
            return $.ajax(url, {data: JSON.stringify(data), type: (type || "GET")});
        }
    });
});