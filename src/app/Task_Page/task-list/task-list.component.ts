import { Component } from '@angular/core';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  jobList = [
    {
      title: 'Supervisoraa, Strategy Partime',
      location: 'Wisconsin',
      type: 'Full time',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      company: 'Amanda',
      price: '$500',
      icon: 'assets/imgs/page/job/ui-ux.svg',
      skills: ['Adobe XD', 'Figma']
    },
    {
      title: 'Copywriter - Fallon MN',
      location: 'Virginia',
      type: 'Full time',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      company: 'AliStudio, Inc',
      price: '$500',
      icon: 'assets/imgs/page/job/ui-ux2.svg',
      skills: ['Adobe XD', 'Figma']
    },
    {
      title: 'UI / UX Designer - Fulltime',
      location: 'New York City',
      type: 'Full time',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      company: 'AliStudio, Inc',
      price: '$500',
      icon: 'assets/imgs/page/job/ui-ux3.svg',
      skills: ['Adobe XD', 'Figma']
    }
  ];

}
