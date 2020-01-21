import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Request} from "../util/request";

@Injectable()
export class CommonService {

  constructor(private http: HttpClient, private request: Request) {

  }

  /**
   * 获取文章列表
   */
  getArticleList(pageSize: number, currentPage: number): any {

    return this.request.post('articleList', {
      pageSize, currentPage
    });

  }

  /**
   * 发表文章
   * @param user_id
   * @param title
   * @param content
   */
  publishArticle(
    user_id: string, title: string, content: string): Observable<any> {

    const url = "http://localhost:3000/addArticle";

    let httpParams: HttpParams = new HttpParams({
      fromObject: {user_id, title, content}
    });

    let header = new HttpHeaders({
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'enctype': 'multipart/form-data'
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post(url, httpParams, {headers: header});
  }


  /**
   * 获取文章
   * @param article_id
   */
  getArticleById(article_id: number): Observable<any> {
    return this.request.post('getArticleById', {article_id});

  }

  commend(article_id: number) {

    return this.request.post('commend', {article_id});

  }

  /**
   * 获取最热文章列表
   */
  getHotList(){

    return this.request.get('hotArticleList');
  }


}
