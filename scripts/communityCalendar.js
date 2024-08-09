$(document).ready(function() {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var events = []; // Array to store events

    function updateCalendar(month, year) {
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var firstDay = new Date(year, month, 1).getDay();
        var calendar = $("#calendar");
        calendar.find("li:gt(6)").remove(); // Clear previous days, keep weekdays

        for (var i = 0; i < firstDay; i++) {
            calendar.append("<li class='not-current-month'></li>");
        }

        // Add days of the month
        for (var day = 1; day <= daysInMonth; day++) {
            var dayClass = "";
            var eventClass = "";
            var eventText = "";

            if (year === currentYear && month === currentMonth && day === currentDay) {
                dayClass = "current-day";
            } else if (year < currentYear || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && day < currentDay)) {
                dayClass = "past-day";
            }

            // Check if the day has an event
            var event = events.find(e => new Date(e.date).getDate() === day && new Date(e.date).getMonth() === month && new Date(e.date).getFullYear() === year);
            if (event) {
                eventClass = "event";
                eventText = `<div class='event-indicator'></div>`;
            }

            calendar.append(`<li class='${dayClass} ${eventClass}' data-date='${year}-${month+1}-${day}' data-event='${event ? JSON.stringify(event) : ""}'>${day}${eventText}</li>`);
        }

        $("#currentMonth").text(new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }));
    }

    $("#prevMonth").click(function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar(currentMonth, currentYear);
    });

    $("#nextMonth").click(function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar(currentMonth, currentYear);
    });

    $(document).on('click', '.event', function() {
        var eventData = $(this).data('event');
    
        // ensure event data is a string
        var event;
        if (typeof eventData === 'string') {
            try {
                event = JSON.parse(eventData);
            } catch (e) {
                console.error("Error parsing event data:", e);
                return;
            }
        } else {
            
            event = eventData;
        }
    
        if (event) {
            var eventContent = `<p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> ${event.time}</p>
                                <p><strong>Description:</strong> ${event.description}</p>`;
            $("#overlayContent").html(eventContent);
            openNav(); // Trigger overlay opening
        }
        console.log('Event clicked:', eventData); // Confirm event click
    });
    

    document.getElementById('eventForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventDescription = document.getElementById('eventDescription').value;

        // Create an event object
        const newEvent = {
            date: eventDate,
            time: eventTime,
            description: eventDescription
        };

        
        events.push(newEvent);

        // Update the calendar
        updateCalendar(currentMonth, currentYear);

        // Clear the form
        event.target.reset();
    });

    updateCalendar(currentMonth, currentYear);
});

// Opens overlay
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    console.log("Overlay opened");
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    console.log("Overlay closed");
}
