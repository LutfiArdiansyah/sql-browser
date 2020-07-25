import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-column',
  templateUrl: './list-column.component.html',
  styleUrls: ['./list-column.component.scss'],
})
export class ListColumnComponent implements OnInit {
  listOwner = [];
  listTable = [];
  owner = '';
  env = '1';
  table = '';
  listColumn = [];
  listData = [];
  constructor(private api: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getParam();
  }

  getParam() {
    this.spinner.show();
    this.api
      .post({
        sql: 'SELECT USERNAME FROM dba_users ORDER BY USERNAME',
      })
      .subscribe(
        (res) => {
          this.listOwner = res;
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  onChangeEnv() {
    this.spinner.show();
    this.listOwner = [];
    this.listTable = [];
    let env = this.env == '1' ? '' : this.env;
    this.api
      .post({
        sql: 'SELECT USERNAME FROM dba_users' + env + ' ORDER BY USERNAME',
      })
      .subscribe(
        (res) => {
          this.listOwner = res;
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  onChangeOwner() {
    if (!this.owner) {
      return;
    }
    this.spinner.show();
    this.listTable = [];
    let env = this.env == '1' ? '' : this.env;
    this.api
      .post({
        sql:
          'SELECT DISTINCT OBJECT_NAME FROM DBA_OBJECTS' +
          env +
          " WHERE OBJECT_TYPE = 'TABLE' AND OWNER = '" +
          this.owner +
          "' ORDER BY OBJECT_NAME ASC",
      })
      .subscribe(
        (res) => {
          this.listTable = res;
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  onSubmit() {
    this.spinner.show();
    this.listColumn = [];
    this.listData = [];
    let env = this.env == '1' ? '' : this.env;
    let obj = {
      sql:
        'SELECT OWNER,TABLE_NAME,COLUMN_NAME,DATA_TYPE,DATA_LENGTH FROM ALL_TAB_COLUMNS' +
        env +
        " WHERE TABLE_NAME='" +
        this.table +
        "' AND OWNER = '" +
        this.owner +
        "' ORDER BY COLUMN_NAME",
    };
    this.api.post(obj).subscribe(
      (res) => {
        if (res.length > 0) {
          let temp = [];
          Object.keys(res[0]).forEach(function eachKey(key) {
            temp.push(key);
          });
          this.listColumn = temp;
          this.listData = res;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
  }
}
