angular.module('starter.services', [])
    .factory("$ionicPickerI18n", function($window) {
        return {
            ok: "אישור",
            cancel: "בטל",
            weekdays: $window.moment ? $window.moment.weekdaysMin() : ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
            months: $window.moment ? $window.moment.months() : ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
        };
    })
    .factory('ShiftsSchedulesCalculator', function() {

        var results = [];
        var index = 0;

        return {
            calculateSchedule: function(calcRequest) {

                var result = {
                    request: calcRequest,
                    id: index,
                    result: {}
                };

                index++;

                results.push(result);

                return result.id;
            },
            getScheduleResultById: function(id) {
                return results[id];
            }
        };
    });
