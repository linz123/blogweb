import {Component, OnInit} from '@angular/core';
import marked from 'marked';
import {CommonService} from '../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {validate} from 'codelyzer/walkerFactory/walkerFn';


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

  public commentList: any;

  // tslint:disable-next-line:variable-name
  private article_id: number; // 文章id

  // tslint:disable-next-line:variable-name
  public comment_content = '';  // 评论内容

  public replyContent = '';


  // 评论选中值
  public selectValue: number;

  public childValue: number;

  ngOnInit() {

    this.route.paramMap.subscribe(param => {
      // tslint:disable-next-line:radix variable-name
      const article_id = parseInt(param.get('id'));
      this.article_id = article_id;
      this.getCommentList(article_id);
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
          console.log(error.toString());
        }
      );
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
    );
  }


  showAuthorInfo(uid: number) {
    this.service.getAuthorInfo(uid).subscribe(
      resp => {
        if (resp.status === 1000) {
          this.authorInfo = resp.data[0];
        }
      }
    );
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
      );
    } else {
      alert('您已经点过赞了');
    }
  }

  /**
   * 获取评论列表
   * @param article_id
   */
  getCommentList(article_id: number) {
    this.service.getComments(article_id).subscribe(
      resp => {
        if (resp.status === 1000) {
          this.commentList = resp.data.map(item => {
            // 添加回复评论 boolean
            return Object.assign(item, {
              replyShow: false, // 是否展示评论
              replayList: []    // 回复列表数据
            });

          });
          console.log(this.commentList);
        }
      }
    );
  }

  /**
   * 添加评论
   */
  addComment() {
    console.log(this.service.isLogin);
    if (!this.service.isLogin) {
      alert('请先登录');
      return;
    }

    let uid: number = parseInt(this.service.isLogin);

    this.service.addComments(uid, this.article_id, this.comment_content).subscribe(
      resp => {
        if (resp.status === 1000) {
          alert('添加成功');
          this.comment_content = '';
          this.getCommentList(this.article_id);
        }
      }
    );

  }

  // 显示回复栏
  showReply(index: number, commend_id: number) {

    this.childValue = null;  // 清空子选中值
    this.replyContent = '';

    this.commentList[index].replyShow = true;
    if (this.commentList[index].replyShow) {
      this.service.getReplyList(commend_id).subscribe(
        resp => {
          if (resp.status === 1000) {
            this.commentList[index].replayList = resp.data;
            console.log(this.commentList[index]);
          }
        }
      );
    }


  }

  /**
   * 关闭评论
   * @param index
   */
  openReplyInput(index: number) {
    this.childValue = null;
    this.selectValue = this.selectValue === index ? null : index;
  }

  /**
   * 关闭字评论
   * @param index toggle
   */
  ReplyCommentInput(index: number) {
    this.selectValue = null;
    this.childValue = this.childValue === index ? null : index;
  }


  // 关闭回复栏
  closeReply(index: number) {
    this.commentList[index].replyShow = false;
  }

  addReply(comment_id: number, replyToUid: number, index: number) {
    if (!this.service.isLogin) {
      alert('请先登录');
      return;
    }
    const uid = parseInt(this.service.isLogin);
    this.service.addReply(uid, comment_id, this.replyContent, replyToUid)
      .subscribe(resp => {
        if (resp.status === 1000) {
          alert('添加成功');
          this.showReply(index, comment_id);
          this.openReplyInput(index);


        } else {
          alert(resp.message);
        }
      });


  }


  addChildReply(index: number, replyToUId: number, comment_id: number) {
    if (!this.service.isLogin) {
      alert('请先登录');
      return;
    }
    const uid = parseInt(this.service.isLogin);
    this.service.addReply(uid, comment_id, this.replyContent, replyToUId)
      .subscribe(resp => {
        if (resp.status === 1000) {
          console.log(index);
          this.showReply(index, comment_id);
          this.openReplyInput(index);
          alert('添加成功');
        } else {
          alert(resp.message);
        }
      });


  }

}
