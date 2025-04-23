import { Event } from '../../../features/events/models/event.model';
//import { Feedback } from '../../../features/feedback/models/feedback.model';
//import { Reclamation } from '../../../features/reclamation/models/reclamation.model';

export interface Participant {
    id?: string;
    name: string;
    email: string;
    eventIds?: string[];
    events?: Event[];
    certificationIds?: string[];
   // givenFeedbacks?: Feedback[];
    //submittedReclamations?: Reclamation[];
}