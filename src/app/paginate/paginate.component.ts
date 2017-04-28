import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html'
})
export class PaginateComponent implements OnInit, OnChanges {

  @Input() offset: number = 0;
  @Input() limit: number = 1;
  @Input() size: number = 1;
  @Input() range: number = 3;

  @Output() pageChange : EventEmitter<number> = new EventEmitter<number>()

  currentPage: number;
  totalPages: number;
  pages: Observable<number[]>;

  constructor() { }

  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
    console.log('size', this.size);
  }

  ngOnChanges(){
    this.getPages(this.offset, this.limit, this.size)
  }

  getPages(offset: number, limit: number, size: number){
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = Observable.range(-this.range, this.range * 2 + 1)
    .map((offset) => this.currentPage + offset)
    .filter(page => this.isValidPageNumber(page, this.totalPages)).toArray();
    //console.log('pages',this.pages);
  }

  isValidPageNumber(page: number, totalPages: number) : boolean{
    return page > 0 && page < totalPages
  }

  getCurrentPage(offset: number, limit: number) : number{
    return Math.floor(offset/limit) + 1
  }

  getTotalPages(limit: number, size: number) : number{
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  selectPage(page: number, event){
    event.preventDefault();
    if(this.isValidPageNumber(page, this.totalPages)){
      console.log('page', page)
      this.pageChange.emit((page - 1) *  this.limit )
    }
  }

}
