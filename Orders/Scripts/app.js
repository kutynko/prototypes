var app = angular.module('demo', ['treeView']).
	controller('orders-ctrl', function ($scope) {
		$scope.allStudents = [{ id: 1, name: 'Ruslan Kutynko', group: 'pdm021' },
							  { id: 2, name: 'Raman Piatrou', group: 'asoi022' },
							  { id: 3, name: 'Artur Yarotski', group: '' }];

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

		$scope.proposal = [];

		$scope.addProposal = function () {

			var operationId = $scope.selectedOperation.id;
			var selectedStudents = _.chain($scope.allStudents).filter(function (s) { return !!s.selected; }).map(function (s) { s.selected = false; return new Node(s.id, s.name); }).value();
			$scope.allStudents.allSelected = false;

			var node = _.findWhere($scope.proposal, { id: operationId });
			if (node) {
				node.innerNodes = _.union(node.innerNodes, selectedStudents);
			} else {
				$scope.proposal.push(new Node(operationId, $scope.selectedOperation.description, selectedStudents));
			}
			$scope.selectedOperation = null;
		};

		$scope.selectAllStudents = function () {
			var select = $scope.allStudents.allSelected;
			_.forEach($scope.allStudents, function (s) { s.selected = select; });
		}

		$scope.canAddProposal = function () {
			return !$scope.selectedOperation || _.every($scope.allStudents, function (s) { return !s.selected; });
		}





		$scope.tree = [{
			text: 'Add Student', state: 'collapsed', innerNodes: [
													   { text: 'Ruslan Kutynko', state: 'empty', innerNodes: [] },
													   {
													   	text: 'Ruslan Kutynko', state: 'collapsed', innerNodes: [
														{ text: 'Ruslan Kutynko', state: 'empty', innerNodes: [] },
														{ text: 'Ruslan Kutynko', state: 'empty', innerNodes: [] }
													   	]
													   }
			]
		},
					{
						text: 'Remove Student', state: 'collapsed', innerNodes: [
														 { text: 'Ruslan Kutynko', state: 'empty', innerNodes: [] },
														 {
														 	text: 'Ruslan Kutynko', state: 'collapsed', innerNodes: [
														  { text: 'Ruslan Kutynko', state: 'empty', innerNodes: [] },
														  {
														  	text: 'Ruslan Kutynko', state: 'collapsed', innerNodes: [
														 {
														 	text: 'Ruslan Kutynko', state: 'collapsed', innerNodes: [
														  { text: 'Ruslan Kutynko', state: 'empty', innerNodes: [] },
														  { text: 'Ruslan Kutynko', state: 'collapsed', innerNodes: [] }
														 	]
														 },
														 { text: 'Ruslan Kutynko', state: 'collapsed', innerNodes: [] }
														  	]
														  }
														 	]
														 }
						]
					}];
	});