import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

type TabType = 'recommendations' | 'events';

@Component({
  selector: 'app-combined-view',
  templateUrl: './combined-view.component.html',
  styleUrls: ['./combined-view.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CombinedViewComponent implements OnInit {
  activeTab: TabType = 'recommendations';

  constructor() { }

  ngOnInit(): void { }

  switchTab(tab: TabType): void {
    this.activeTab = tab;
  }
}
