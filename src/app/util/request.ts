import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RequestMethods} from "./request-methods";


@Injectable()
export class Request {

  constructor(private httpClient: HttpClient) {

  }

  private address: string = '/api/';


  private header = new Headers({
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'enctype': 'multipart/form-data'
    'X-Requested-With': 'XMLHttpRequest'
  });


  /**
   * 发起一个 get 请求
   */
  get(url: string, paraMap: {} = {}, header: {} = {}): Observable<any> {
    return this.sendRequest(url, paraMap, RequestMethods.GET, this.header);
  }


  /**
   * post 请求
   */
  post(url: string, paramMap: {} = {}, header: {} = {}): Observable<any> {

    const params = new HttpParams({
      fromObject: paramMap
    });


    return this.httpClient.post(
      this.address + url, params, {headers: header, withCredentials: true});
  }


  protected sendRequest(
    url: string, paramMap: {} = {}, method: RequestMethods = RequestMethods.GET,
    header: {} = {}
  ): Observable<any> {

    return this.httpClient.request(method, this.address + url,
      {body: paramMap, params: paramMap, headers: header, withCredentials: true}
    );

  }


}
