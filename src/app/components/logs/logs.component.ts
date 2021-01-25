import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log = {
    id: '',
    text: '',
    date: null,
  };
  loaded: boolean = false;
  constructor(private logService: LogService) {
    this.logs = [];
  }

  ngOnInit(): void {
    this.logService.stateClear.subscribe((clear) => {
      if (clear) {
        this.selectedLog = {
          id: '',
          text: '',
          date: null,
        };
      }
    });
    this.logService.getLogs().subscribe((logs) => {
      this.logs = logs;
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    this.logService.removeLog(log);
  }
}
