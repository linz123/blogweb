import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {NavComponent} from './components/nav/nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatBadgeModule} from "@angular/material/badge";
import {CommonService} from "./service/common.service";
import {HttpClientModule} from "@angular/common/http";
import {MarkdownComponent} from './markdown/markdown.component';
import {LMarkdownEditorModule} from "ngx-markdown-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticleComponent} from './article/article.component';

import {Request} from "./util/request";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {ArticleDialogComponent} from './components/articla-dialog/article-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent,
    MarkdownComponent,
    ArticleComponent,
    ArticleDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatBadgeModule,
    HttpClientModule,
    LMarkdownEditorModule,
    FormsModule,
    MatTabsModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    ArticleDialogComponent
  ],
  providers: [CommonService, Request],
  bootstrap: [AppComponent]
})
export class AppModule {
}
