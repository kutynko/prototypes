var app = angular.module('demo', []).
	controller('orders-ctrl', function ($scope) {
		$scope.allStudents = [{ name: 'Ruslan Kutynko', group: 'pdm021' },
							  { name: 'Raman Piatrou', group: 'asoi022' },
							  { name: 'Artur Yarotski', group: '' }];

		$scope.allOperations = [{ id: 1, description: 'add', category: 'adding', fields: [{ id: 11, caption: 'target date', type: 'DateTime' }], toString: function () { return this.description; } },
							    {
							    	id: 2, description: 'modify', category: 'adding', fields: [{ id: 12, caption: 'from', type: 'DateTime' },
																								{ id: 13, caption: 'to', type: 'DateTime' }], toString: function () { return this.description; }
							    },
								{ id: 3, description: 'expel', category: 'removing', fields: [{ id: 14, caption: 'paper ref. number', type: 'String' }], toString: function () { return this.description; } }];


		$scope.allGroups = ['pdm021', 'pdm022', 'pdm023', 'asoi022'];
		$scope.filterGroup = 'all';

		$scope.groupComparer = function (actual, expected) {
			return expected == 'all' || angular.equals(expected, actual);
		};

		$scope.proposal = { students: [], operations: [], conditions: [] };

		$scope.addProposal = function () {

			_.where($scope.allStudents, function (s) { return s.selected; }).forEach(function (s) { $scope.proposal.students.push(s); s.selected = false; });

			$scope.proposal.operations.push($scope.selectedOperation);
			$scope.selectedOperation = null;

		};

	});