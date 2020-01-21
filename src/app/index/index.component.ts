import {Component, OnInit} from '@angular/core';
import {CommonService} from "../service/common.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {


  public articleList = null;

  listLength: number;

  pageSize = 5;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  public hotArticleList: any;

  constructor(
    private service: CommonService) {
  }


  showArticleList(pageIndex: number = 1, pageSize: number = 5) {

    this.service.getArticleList(pageSize, pageIndex)
      .subscribe(resp => {
        console.log(this.pageSizeOptions);
        if (resp.status === 1000) {
          this.listLength = resp.data.total;
          this.articleList = resp.data.result.map(item => {
            return Object.assign(item, {
              isCommend: false
            })
          });
          console.log(this.articleList);
        }
      }, error => console.log(error.toString()))
  }


  reloadPage(pageEvent: PageEvent) {

    this.showArticleList(pageEvent.pageIndex + 1, pageEvent.pageSize);
  }


  commend(article_id: number, index: number) {
    let isCommend = this.articleList[index].isCommend;

    if (!isCommend) {
      this.articleList[index].isCommend = true;
      this.service.commend(article_id).subscribe(
        resp => {
          if (resp.status === 1000) {
            this.articleList[index].article_like_count += 1;
          } else if (resp.status !== 2006) {
            this.articleList[index].isCommend = false;
          }
        }
      )
    }

  }
  /**
   * 获取文章列表
   */
  showHotList() {
    this.service.getHotList().subscribe(
      resp => {
        if (resp.status === 1000) {
          this.hotArticleList = resp.data;
        }
      }
    )
  }





  ngOnInit() {
    this.showArticleList();
    this.showHotList();
  }

}
