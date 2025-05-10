import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

// 🔌 Import des plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendartest',
  templateUrl: './calendartest.component.html',
  styleUrls: ['./calendartest.component.css']
})
export class CalendartestComponent {
  // 👉 On fournit les plugins ici
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    // events: []  // tu peux ajouter tes événements ici
  };
}
