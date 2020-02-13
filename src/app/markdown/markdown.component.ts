import {Component, OnInit} from '@angular/core';
import {CommonService} from "../service/common.service";
import {MatDialog} from '@angular/material/dialog';
import {ArticleDialogComponent} from "../components/articla-dialog/article-dialog.component";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.less']
})
export class MarkdownComponent implements OnInit {

  content: string;

  title: string;
  parentLabel: string;
  label: string;

  constructor(private service: CommonService,
              public dialog: MatDialog
  ) {}


  formControl = new FormControl('', [
    Validators.required
  ]);


  getContent(): void {

    console.log(this.formControl.valid);
    console.log(this.content);

    if (this.formControl.valid && this.content) {

      // 弹窗
      this.dialog.open(ArticleDialogComponent, {
        data: {
          title: this.title,
          content: this.content
        }
      });

    } else {
      alert("文章内容或标题不能为空哦");
    }

  }

  saveDraft(){

  }


  ngOnInit() {

  }

}
