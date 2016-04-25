angular.module('starter.controllers', [])

.controller('ShiftsTableCtrl', function($scope) {})

.controller('CalculatorCtrl', function($scope, $ionicModal, $timeout, ShiftsSchedulesCalculator, $location) {

    var init = function() {
        $ionicModal.fromTemplateUrl('./templates/constraint-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Start date is the current day by default
        var startDate = new Date();

        // Get one week ahead 
        var endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

        $scope.calcRequest = {
            numberOfPositions: 1,
            numberOfGuards: 4,
            constraints: [],
            startDate: startDate,
            endDate: endDate
        };

        $scope.numberOfPositionsChanged(1);

        $scope.newConstraint = {
            allPositions: true,
            allDays: true,
            days: {
                "su": true,
                "mo": true,
                "tu": true,
                "we": true,
                "th": true,
                "fr": true,
                "sa": true
            },
            position: 1
        }
    };


    $scope.openConstraintsPopver = function($event) {
        $scope.modal.show();

    };

    $scope.addConstraint = function(newConstraint) {
        $scope.modal.hide();
        $scope.calcRequest.constraints.push(angular.copy(newConstraint));
        $scope.newConstraint = {
            allPositions: true,
            allDays: true,
            days: {
                "su": true,
                "mo": true,
                "tu": true,
                "we": true,
                "th": true,
                "fr": true,
                "sa": true
            },
            position: 1
        }
    };

    $scope.numberOfPositionsChanged = function(newPositionsNum) {
        $scope.positionsList = [];
        for (var i = 0; i < newPositionsNum; i++) {
            $scope.positionsList.push({
                "name": "עמדה מספר " + (i + 1),
                "index": i
            });
        }
    }

    $scope.calculateBestShiftsSchedule = function() {
        // TODO : add validation
        if (true) {

            var id = ShiftsSchedulesCalculator.calculateSchedule($scope.calcRequest);
            var earl = '/tab/calculator/' + id;
            $location.path(earl);

        }
    };

    init();

})

.controller('ScheduleResultsCtrl', function($scope, $stateParams, ShiftsSchedulesCalculator, $stateParams) {

    var init = function() {
        var currentId = parseInt($stateParams.scheduleResultsId);
        $scope.result = ShiftsSchedulesCalculator.getScheduleResultById(currentId);
        console.log($scope.result);

        $scope.calendarModel = $scope.result.request.startDate;
        $scope.mode = "week";
        $scope.eventSource = [{
            "title": "שמירות",
            "startTime": new Date(Date.UTC(2016, 4, 8)),
            "endTime": new Date(Date.UTC(2016, 4, 14)),
            "allDay": false
        }];

        $scope.listOfGuards = [];
        var numOfGuards = $scope.result.request.numberOfGuards;
        for (var i = 0; i < numOfGuards; i++) {
            $scope.listOfGuards.push({
                index: i,
                color: $scope.getRandomColor(i),
                name: ""
            });
        }
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
        //Move the item in the array
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.getRandomColor = function(index) {

        var color;
        if (index == 0) {
            color = 'red';
        } else if (index == 1) {
            color = 'green';
        } else if (index == 2) {
            color = 'blue';
        } else if (index == 3) {
            color = 'yellow';
        } else if (index == 4) {
            color = 'purple';
        } else {
            var letters = '0123456789ABCDEF'.split('');
            var randColor = '#';
            for (var i = 0; i < 6; i++) {
                randColor += letters[Math.floor(Math.random() * 16)];
            }
            color=randColor;
        }

        return color;
    };

    init();
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
