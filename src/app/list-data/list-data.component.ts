import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit {
  searchType = '1';
  listOwner = [];
  listTable = [];
  owner = '';
  env = '1';
  table = '';
  listColumn = [];
  listData = [];
  query = '';
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
    if (this.searchType === '1') {
      let env = this.env == '1' ? '' : this.env;
      let obj = {
        sql: 'SELECT * FROM ' + this.owner + '.' + this.table + env,
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
    } else {
      let obj = {
        sql: this.query,
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
}
