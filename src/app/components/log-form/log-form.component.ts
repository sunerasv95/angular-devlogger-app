import { Component, OnInit } from '@angular/core';

import { LogService } from 'src/app/services/log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string = "";
  title: string = "";
  date: string = "";

  isNew : boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(log =>{
      if(log.id !== null){
        this.isNew = false;
        this.id = log.id;
        this.title = log.title;
        this.date = log.date;
      }
    });
  }

  onSubmit(){
    if(this.isNew){
      const newLog = {
        id: this.generateId(),
        title: this.title,
        date: Date()
      }

      this.logService.saveLog(newLog);
      this.onClear();

    }else{
      const updLog = {
        id: this.id,
        title: this.title,
        date: Date()
      }

      this.logService.updateLog(updLog);
      this.onClear();
    }
  }

  onClear(){
    this.isNew = true;
    this.id = "";
    this.title = "";
    this.logService.stateClear();

  }

  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
