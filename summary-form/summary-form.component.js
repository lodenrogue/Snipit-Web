'use strict';

angular.module('summaryForm').
	component("summaryForm", {
		templateUrl: "summary-form/summary-form.html",
		
		controller: function SummaryFormController($http, $scope) {
			this.text = "";
			var self = this;
			var snipitApi = "http://23.92.28.186:8080/snipit-api/summary";

			this.submit = function(text, outputSize) {
				if(text.length == 0) return;
				
				this.text = text;
				if(outputSize == undefined || isNaN(outputSize) || outputSize <= 0) {
					this.outputSize = 3;
				}
				else {
					this.outputSize = outputSize;
				}

				var postData = new Object();
				postData.text = this.text;
				postData.outputSize = this.outputSize;
				
				$http.post(snipitApi, postData).
					then(function(response) {
						self.response = response.data;
				});

				this.outputSize = "";

			};

			this.reset = function(){
				this.text = "";
				this.response = null;
				this.outputSize = "";
			};
		}
	});