import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {CommonService} from "../../service/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.less']
})
export class ArticleDialogComponent implements OnInit {


  allLabels: string[];  // 所有类型标签

  selectedLabel: string[] = []; // 选中的标签

  publishType = "1";  // 发布文章类型

  sketch: string = '';

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ArticleDialogComponent>,
              private service: CommonService,
              private router: Router
  ) {


  }


  // 关闭弹窗
  public dialogClose(): void {
    this.dialogRef.close();
  }

  // 获取所有的标签
  showAllLabels(): void {
    this.service.getAllLabels().subscribe(
      resp => {
        if (resp.status === 1000) {

          let arr = [];
          for (let i = 0; i < resp.data.length; i++) {
            arr.push(resp.data[i].label_name);
          }
          this.allLabels = arr;
          console.log(this.allLabels);
        }
      }
    )
  }

  // 当前选中标签移除

  remove(label): void {
    console.log(this.selectedLabel);
    console.log(label);
    const index = this.selectedLabel.indexOf(label);
    console.log(index);
    if (index >= 0) {
      this.selectedLabel.splice(index, 1);

    }
  }

  add(event: MatChipInputEvent): void {

    if (this.selectedLabel.length >= 3) {
      return;
    }

    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.selectedLabel.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  optionAdd(option: string) {
    if (this.selectedLabel.length >= 3) {
      return;
    }
    this.selectedLabel.push(option);
  }


  consoleType() {

  }

  publish() {
    const {title, content} = this.data;
    const labels = this.selectedLabel;

    this.service.publishArticle('1', title, content, labels, this.sketch).subscribe(
      resp => {
        if (resp.status === 1000) {
          alert(resp.message);
          this.dialogClose();
          this.router.navigateByUrl('/article/' + resp.data.article_id);
        }
      }
    )

  }


  ngOnInit() {
    this.showAllLabels();
  }


}
