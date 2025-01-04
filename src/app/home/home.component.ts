import { Component } from '@angular/core';
import { Department } from '../core/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  departments: Department[] = [
    {
      id: 1,
      deptName: 'Software Development Department',
      details: [
        'Web Development Team (Front-End / Back-End).',
        'Mobile Development Team.',
        'Game Development Team.',
      ],
      icon: 'fa-solid fa-code',
    },
    {
      id: 2,
      deptName: 'System Analysis Department',
      details: [
        'Responsible for analyzing client requirements and converting them into technical specifications.',
      ],
      icon: 'fa-solid fa-chart-pie',
    },
    {
      id: 3,
      deptName: 'Quality Assurance and Testing Department',
      details: [
        'Ensures software is free of bugs and meets quality standards.',
      ],
      icon: 'fa-solid fa-microscope',
    },
    {
      id: 4,
      deptName: 'Project Management Department',
      details: [
        'Manages project execution according to timelines and budgets.',
      ],
      icon: 'fa-solid fa-bars-progress',
    },
    {
      id: 5,
      deptName: 'IT Infrastructure Department',
      details: ['Responsible for managing servers and networks.'],
      icon: 'fa-solid fa-wifi',
    },
    {
      id: 6,
      deptName: 'AI and Data Science Department',
      details: [
        'Specializes in data analysis and developing machine learning models.',
      ],
      icon: 'fa-solid fa-brain',
    },
    {
      id: 7,
      deptName: 'DevOps Department',
      details: [
        'Focuses on integrating development and operations for better deployment processes.',
      ],
      icon: 'fa-solid fa-infinity',
    },
  ];

  constructor(private _Router: Router) {}

  navigateToEmployee(id: number,name:string):void{
    this._Router.navigate(['/employee', id ,name]);
  }
}
