import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.services';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  $searchText:BehaviorSubject<string> = new BehaviorSubject('');
  searchedPeople:Array<any> = [];
  searchedJokes:Array<any> = [];
  searchText = '';

  constructor(
    private service:HttpService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.$searchText.pipe(
      distinctUntilChanged(),
      debounceTime(2000)
    ).subscribe((searchText)=>{
      if(searchText) this.makeQuery()
    })
  }

  searchQueryChanges(){
    this.$searchText.next(this.searchText)
  }

  makeQuery(){
    this.spinner.show()
    this.service.search(this.searchText).subscribe((results)=>{
      if(results.succeeded){
        this.searchedPeople = results?.data?.peopleSearchResult?.peoples;
        this.searchedJokes = results?.data?.jokeSearchResult?.jokes;
      }
      this.spinner.hide()
    })
  }

}
