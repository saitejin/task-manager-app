const app = angular.module('taskApp', []);

app.controller('taskController', function($scope) {
  // Load from localStorage or start with empty list
  $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  $scope.newTask = {
    name: '',
    priority: ''
  };

  // Add task
  $scope.addTask = function() {
    if ($scope.newTask.name && $scope.newTask.priority) {
      $scope.tasks.push({
        name: $scope.newTask.name,
        priority: $scope.newTask.priority,
        completed: false
      });
      $scope.newTask = { name: '', priority: '' };
      localStorage.setItem("tasks", JSON.stringify($scope.tasks));
    }
  };

  // Remove task
  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify($scope.tasks));
  };

  // Watch for changes (e.g., checkbox updates)
  $scope.$watch('tasks', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      localStorage.setItem("tasks", JSON.stringify(newVal));
    }
  }, true);
});
