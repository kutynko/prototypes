var app = angular.module("todoApp", [])
	.controller("DraggableController", function () {
		var ctrl = this;
		ctrl.data = [
			{ studentName: 'Иванов Иван Иванович', faculty: 1, createdOn: new Date(2015, 3, 1), actions: [{ description: '', authority: [''] }] },
			{ studentName: 'Петров Петр Петрович', faculty: 1, createdOn: new Date(2015, 3, 1), actions: [{ description: '', authority: [''] }] },
			{ studentName: 'Павлов Павел Павлович', faculty: 2, createdOn: new Date(2015, 4, 2), actions: [{ description: '', authority: [''] }] }
		];

		ctrl.draggedItems = [];

		var attemptingToDrag = false;
		var isDragging = false;

		ctrl.startDrag = function () {
			attemptingToDrag = true;
			console.log('going to drag?');
			isDragging = false;
			window.setTimeout(function () {
				if (attemptingToDrag) {
					isDragging = true;

					var i = 0;
					while (i < ctrl.data.length) {
						if (ctrl.data[i].isSelected) {
							ctrl.draggedItems.push(ctrl.data[i]);
							ctrl.data[i].isSelected = false;
							ctrl.data.splice(i, 1);
						} else {
							i++;
						}
					}


					console.log('dragging');
				}
			}, 100);
		};

		ctrl.stopDrag = function () {
			attemptingToDrag = false;

			if (isDragging) {

				for (var i = 0; i < ctrl.draggedItems.length; i++) {
					ctrl.data.push(ctrl.draggedItems[i]);
				}
				ctrl.draggedItems.length = 0;

				console.log("releasing items");
			}
			else {
				console.log("not yet...");
			}
		}

		ctrl.movingItems = function () {
			if (isDragging) {

				console.log('moving somewhere');
			}
		}

		ctrl.tougleStudentSelection = function (student) {
			student.isSelected = !student.isSelected;
		}
	});


function StateMachine(states) {
	this.states = states;
	this.currentState = null;

	for (var i = 0; i < states.length; i++) {
		states[i].setMachine(this);
		console.log('state ' + states[i].name + ' registered');
	}
}

StateMachine.prototype.setState = function (state) {
	if (this.currentState.leave()) {
		this.currentState = state;
		state.enter();
	}
}

function State(name) {
	this.name = name;
}

State.prototype.setMachine = function (machine) {
	this.context = machine;
}

State.prototype.leave = function () {
	return true;
}

State.prototype.enter = function () {
	return true;
}

var coords = new CoordinatesTracker();


var initial = new State('Initial');

var dragging = new State('Dragging');
dragging.enter = function () {
	coords.start();
	var container = this.context.draggingContainer;
	container.style.display = 'block';
	$(document).mousemove(function (e) {
		container.style.top = e.pageY;
		container.style.left = e.pageY;


	});

}

var dropped = new State('Dropped');
dropped.enter = function () {
	coords.stop();
	this.context.draggingContainer.style.display = 'none';
}
