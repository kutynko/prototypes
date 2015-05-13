function CoordinatesTracker() {
	this.X = 0;
	this.Y = 0;

	this._handler = function (e) {
		this.X = e.pageX;
		this.Y = e.pageY;
	};
}

CoordinatesTracker.prototype.start = function () {
	$(document).mousemove(this._handler);
}

CoordinatesTracker.prototype.stop = function () {
	$(document).unbind("mousemove", this._handler);
}

