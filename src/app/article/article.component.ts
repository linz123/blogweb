import {Component, OnInit} from '@angular/core';
import marked from 'marked';
import {CommonService} from "../service/common.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {

  constructor(private service: CommonService,
              private route: ActivatedRoute
  ) {
  }

  public articleData: any;

  public hotArticleList: any;

  public authorInfo: any;

  public isCommend: boolean;

  ngOnInit() {

    this.route.paramMap.subscribe(param => {
      let article_id = parseInt(param.get("id"));
      this.service.getArticleById(article_id).subscribe(
        resp => {
          if (resp.status === 1000) {

            this.articleData = resp.data[0];
            this.isCommend = this.articleData.isCommend;
            this.showAuthorInfo(this.articleData.user_id);

            document.getElementById('article').innerHTML
              = marked(this.articleData.article_content);
          }
        }, error => {
          console.log(error.toString())
        }
      )
    });

    this.showHotList();

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


  showAuthorInfo(uid: number) {
    this.service.getAuthorInfo(uid).subscribe(
      resp => {
        if (resp.status === 1000) {
          this.authorInfo = resp.data[0];


        }
      }
    )
  }

  commend(article_id: number) {
    if (!this.isCommend) {
      this.service.commend(article_id).subscribe(
        resp => {
          if (resp.status === 1000) {
            this.isCommend = true;
            this.articleData.article_like_count += 1;
          }
        }
      )
    } else {
      alert('您已经点过赞了');
    }
  }


}
