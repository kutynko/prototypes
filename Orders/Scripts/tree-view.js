angular.module('treeView', []).
directive('treeView', function () {
	return {
		scope: { nodes: '=' },
		template: '<tree-view-node class="tree-view-node" ng-repeat="node in nodes" nodes="node" ng-class="{selected: node.selected}"></tree-view-node>',
		link: function (scope, element, attrs) {
			element.addClass('tree-view');
		}
	}
}).
directive('treeViewNode', function (RecursionHelper) {
	return {
		template: '<span ng-click="node.toggleState()" class="tree-view-node-icon" ng-class="node.state"></span>' +
					'<span class="tree-view-node-text" ng-click="node.selected=(!node.selected)">{{node.text}}</span>' +
					'<div class="tree-view-node-innerNodes" ng-show="node.state==\'expanded\'">' +
						'<tree-view-node class="tree-view-node" ng-repeat="node in node.innerNodes" ng-class="{selected: node.selected}"></tree-view-node>' +
					'</div>',
		compile: function (element) {
			return RecursionHelper.compile(element);
		}
	};
}).
factory('RecursionHelper', ['$compile', function ($compile) {
	return {
		/**
			* Manually compiles the element, fixing the recursion loop.
			* @param element
			* @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
			* @returns An object containing the linking functions.
			*/
		compile: function (element, link) {
			// Normalize the link parameter
			if (angular.isFunction(link)) {
				link = { post: link };
			}

			// Break the recursion loop by removing the contents
			var contents = element.contents().remove();
			var compiledContents;
			return {
				pre: (link && link.pre) ? link.pre : null,
				/**
					* Compiles and re-adds the contents
					*/
				post: function (scope, element) {
					// Compile the contents
					if (!compiledContents) {
						compiledContents = $compile(contents);
					}
					// Re-add the compiled contents to the element
					compiledContents(scope, function (clone) {
						element.append(clone);
					});

					// Call the post-linking function, if any
					if (link && link.post) {
						link.post.apply(null, arguments);
					}
				}
			};
		}
	};
}]);

function Node(id, text, innerNodes) {
	this.id = id;
	this.text = text;
	this.innerNodes = innerNodes || [];

	this.state = this.innerNodes.length == 0 ? 'empty' : 'collapsed';
}

Node.prototype.toggleState = function () {
	return this.state = this.state == 'expanded' ? 'collapsed' : 'expanded';
}