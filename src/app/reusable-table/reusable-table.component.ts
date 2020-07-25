import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss'],
})
export class ReusableTableComponent implements OnInit {
  @Input('column') column = [];
  @Input('data') listData = [];
  constructor() {}

  ngOnInit(): void {}
}
