var app = angular.module('demo', []).
	controller('orders-ctrl', function ($scope) {
		$scope.allStudents = [{ name: 'Ruslan Kutynko' },
							  { name: 'Raman Piatrou' }];

		$scope.allOperations = ['add', 'remove', 'move'];
		
	});