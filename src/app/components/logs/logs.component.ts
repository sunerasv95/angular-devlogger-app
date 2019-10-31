import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs : Log[];
  selectedLog: Log;

  constructor(private logService: LogService) { }

  ngOnInit() {

    this.logService.clearState.subscribe(clear => {
      if(clear){
        this.selectedLog = {
          id: "",
          title: "",
          date: ""
        }
      }
    });

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }

  onLogSelected(log: Log){
    this.logService.setLogForm(log);
    this.selectedLog = log;
    //console.log(log);
  }

  onDelete(log: Log){
    if(confirm("Are you sure?")){
      this.logService.deleteLog(log);
    }
  }

}
