var app = angular.module("todoApp", [])
.controller("DraggableController", function ($scope) {
	var ctrl = this;
	ctrl.data = [
		{ studentName: 'Иванов Иван Иванович', faculty: 1, createdOn: new Date(2015, 3, 1), actions: [{ description: '', authority: [''] }] },
		{ studentName: 'Петров Петр Петрович', faculty: 1, createdOn: new Date(2015, 3, 1), actions: [{ description: '', authority: [''] }] },
		{ studentName: 'Павлов Павел Павлович', faculty: 2, createdOn: new Date(2015, 4, 2), actions: [{ description: '', authority: [''] }] }
	];

	ctrl.preparedData = [];
	ctrl.draggedItems = [];
	ctrl.container = document.getElementById('drag-container');

	var isDragging = false;


	var dropHandler = function (e) {
		for (var i = 0; i < ctrl.draggedItems.length; i++) {
			ctrl.preparedData.push(ctrl.draggedItems[i]);
		}
		ctrl.draggedItems.length = 0;

		ctrl.container.style.display = 'none';

		$(document).unbind('mousemove', dragHandler);
		$(document).unbind('mouseup', dropHandler);
		isDragging = false;
		$scope.$apply();
	};

	var dragHandler = function (e) {
		ctrl.container.style.left = e.pageX + 'px';
		ctrl.container.style.top = e.pageY + 'px';
	};

	ctrl.startDrag = function (item) {
		ctrl.draggedItems.push(item);
		ctrl.data.splice(ctrl.data.indexOf(item), 1);

		ctrl.container.style.display = 'block';
		$(document).mousemove(dragHandler);
		$(document).mouseup(dropHandler);

		isDragging = true;
	};

	var oldborder;
	ctrl.startHover = function ($event) {
		var el = $event.target;
		if (isDragging) {
			oldborder = el.style.border;
			el.style.border = "1px solid red";
		}
	};
	ctrl.endHover = function ($event) {
		var el = $event.target;
		if (isDragging) {
			el.style.border = oldborder;
		}
	};
})
.directive('draggable-list', function ($document) {
	return {
		link: function (scope, element, attr) {
			var startX = 0, startY = 0, x = 0, y = 0;

			element.css({
				position: 'relative',
				border: '1px solid red',
				backgroundColor: 'lightgrey',
				cursor: 'pointer'
			});

			element.on('mousedown', function (event) {
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.pageX - x;
				startY = event.pageY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.pageY - startY;
				x = event.pageX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		},
		controller: function ($scope) {
			$scope.items = [];

			$scope.getSelectedItems = function () {
				var result = [];
				for (var i = 0; i < $scope.items.length; i++) {
					if ($scope.items[i].isSelected) {
						result.push($scope.items[i]);
					}
				}
			};

			$scope.addItems = function (newItems) {
				for (var i = 0; i < newItems.length; i++) {
					$scope.items.push(newItems[i]);
				}
			}
		}
	};
});

