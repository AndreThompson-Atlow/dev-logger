import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  text: string = '';
  id: string = '';
  date: any;
  isNew: boolean = true;
  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.selectedLog.subscribe((log) => {
      if (log.id !== '') {
        this.isNew = false;
        this.text = log.text;
        this.id = log.id;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    if (this.isNew) {
      // New Log
      const newLog = {
        id: this.uuidv4(),
        text: this.text,
        date: new Date(),
      };
      this.logService.addLog(newLog);
    } else {
      // Edited Log
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date(),
      };
      this.logService.updateLog(updLog);
    }
    this.clearLog();
  }
  clearLog() {
    this.id = '';
    this.text = '';
    this.date = null;
    this.isNew = true;
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
