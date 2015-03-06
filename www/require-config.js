var require = {
	baseUrl: "../www/app",
	paths: {
		text: "../libs/requirejs/plugins/text",
		i18n: "../libs/requirejs/plugins/i18n",
		domReady: "../libs/requirejs/plugins/domReady",
		bootstrap: "../libs/bootstrap3/js/bootstrap",
		handlebars: "../libs/handlebars-v1.3.0",
		jquery: "../libs/jquery-2.1.1",
		underscore: "../libs/lodash.compat",
		backbone: "../libs/backbone-1.1.2",
		moment: "../libs/moment",
		"require-css": "../libs/requirejs/plugins/require-css/css",
		"jquery.dataTables": "../libs/jquery.dataTables.min",
		"jquery.flot": "../libs/jquery.flot"
	},
	
	map: {
		"*": { css: "require-css" }
	},
	
	shim: {
		jquery: {
			exports: "jQuery"
		},
		
		underscore: {
			exports: "_"
		},
		
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		
		bootstrap: {
			deps: ["jquery"]
		},
		
		handlebars: {
			exports: "Handlebars"
		},
		
		"jquery.dataTables": {
			deps: ["jquery"]
		}
	}
};