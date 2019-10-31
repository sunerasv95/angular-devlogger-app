import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs/internal/observable/of';

import { Log } from '../models/Log';



@Injectable({
  providedIn: 'root'
})
export class LogService {

logSource = new BehaviorSubject({ id: null, title: null, date: null});
selectedLog = this.logSource.asObservable();

stateSource = new BehaviorSubject(true);
clearState = this.stateSource.asObservable();

logs = []

  constructor() { }

  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs =[];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs);
  }

  saveLog(log: Log){
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log){
    this.logs.forEach((cur, index)=>{
      if(log.id == cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index)=>{
      if(log.id == cur.id){
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  setLogForm(log: Log){
    this.logSource.next(log);
  }

  stateClear(){
    this.stateSource.next(true);
  }

}
