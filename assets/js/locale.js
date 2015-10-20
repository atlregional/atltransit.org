var whitelabel_prefix = 'http://opentrip.atlantaregion.com/otp-rest-servlet/';

var whitelabel_minDate = new Date(2014, 02, 08);
var whitelabel_maxDate = new Date(2020, 03, 30);

var Locale = {};

Locale.dateFormat = 'mm-dd-yy';
Locale.timeFormat = 'h:mma';
Locale.dateAriaLabel = 'Date, use Ctrl en arrow keys to navigate, enter to choose';
Locale.loading = "Loading...";
Locale.edit = "Change trip";
Locale.plan = "Plan trip";
Locale.geocoderInput = "Enter starting address, or click on the map...";
Locale.originInput = "Enter starting address, or click on the map...";
Locale.destinationInput = "Enter destination...";
Locale.startpointEmpty = "No starting point entered";
Locale.noStartpointSelected = "No starting point selected";
Locale.destinationEmpty = "No destination entered";
Locale.noDestinationSelected = "No destination selected";
Locale.noValidDate = "Enter a valid date";
Locale.noValidTime = "Enter a valid time";
Locale.dateTooEarly = function ( minDate8601 ) { return "This trip planner works for travel dates starting "+minDate8601.split('-').reverse().join('-'); };
Locale.dateTooLate = function ( maxDate8601 ) { return "This trip planner works for travel dates till "+maxDate8601.split('-').reverse().join('-'); };
Locale.from = "From";
Locale.via = "Via";
Locale.to = "To";
Locale.date = "Date";
Locale.time = "Time";
Locale.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
Locale.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
Locale.daysMin = ['Su','Mo','Tu','We','Th','Fr','Sa'];
Locale.earlier = 'Earlier';
Locale.later = 'Later';
Locale.noAdviceFound = 'No valid trips found';
Locale.walk = 'Walk';
Locale.platformrail = 'Platform';
Locale.platform = 'Platform';
Locale.amountTransfers = function ( transfers ) { if (transfers === 0) { return 'Direct'; } else { return transfers+ ' transfers';} };
Locale.autocompleteMessages = {
        noResults: "No results found.",
        results: function( amount ) {
            return amount + ( amount > 1 ? " results are " : " result is" ) + " available, use the up and down arrow keys to navigate them.";
        }
};