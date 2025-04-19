

	document.addEventListener('DOMContentLoaded', function() {
		var mainCalendarEl = document.getElementById('calendar');
		var today = new Date();
		// today.setHours(0, 0, 0, 0) // Initial time set for first event
		var mainCalendar = new FullCalendar.Calendar(mainCalendarEl, {
			headerToolbar: {
				left: 'title',
				center: 'prev,next',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
				
			},
			initialDate: today,
			weekNumbers: true,
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			selectable: true,
			nowIndicator: true,
			events: [
				{
				title: 'Graphic Design Exam',
				start: moment().format('YYYY-MM-02') + "T10:30:00",
				className: "border-0 bg-primary text-white ff-heading fs-18 fw-semibold"
				},
				{
				title: 'Meeting with Candidate',
				start: moment().format('YYYY-MM-11') + "T22:12:00",
        		end: moment().format('YYYY-MM-11') + "T23:00:00",
				className: "border-0 bg-info text-white ff-heading fs-18 fw-semibold"
				},
				{
				title: 'Evaluate',
				start: moment().format('YYYY-MM-22') + "T10:20:00",
        		end: moment().format('YYYY-MM-22') + "T12:00:00",
				className: "border-0 bg-secondary text-white ff-heading fs-18 fw-semibold"
				},
				{
				title: 'Web Design Exam',
				start: moment().format('YYYY-MM-DD') + "T07:15:00",
				className: "border-0 bg-warning text-white ff-heading fs-18 fw-semibold"
				},
			],

			
			eventClick: function (infoEvent) {
				console.log(infoEvent.event.title);
				let infoModal = $("#event-details");
				infoModal.modal("show");
				console.log(infoModal.find(".event-title"));
				infoModal.find(".event-title").text(infoEvent.event.title);
			},
			eventLeave: function(info) {
				console.log('event left!', info.event);
			}
		});
	  
		mainCalendar.render();
	  });
	
	
	

	