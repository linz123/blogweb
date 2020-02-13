import {Component, OnInit} from '@angular/core';
import {ArticleDialogComponent} from "../articla-dialog/article-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {CommonService} from "../../service/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public service: CommonService,
    private router: Router
  ) {
  }


  public login(): void {
    // 弹窗
    this.dialog.open(LoginComponent, {
      // width: '250px',
      data: {}
    });
  }

  loginOut() {
    this.service.loginOUt().subscribe(
      resp => {
        if (resp.status === 1000) {
          console.log(1);
          this.service.userId = null;
          localStorage.removeItem("userId");
          this.router.navigateByUrl('/home');
        }
      }
    )
  }

  ngOnInit() {
  }

}
