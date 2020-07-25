import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isCollaps: boolean = true;
  listMenu = [
    { route: './list-table', icon: 'table', name: 'Table' },
    { route: './list-column', icon: 'view-columns', name: 'Column' },
    { route: './list-data', icon: 'data-cluster', name: 'Data' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
