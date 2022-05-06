import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http.services';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  peopleList:Array<any> = []

  constructor(
    private service:HttpService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.getPeople().subscribe((response)=>{
      if(response.succeeded){
        this.peopleList = response.data;
      }
      this.spinner.hide()
    })
  }

}
