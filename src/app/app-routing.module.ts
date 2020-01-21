import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {MarkdownComponent} from "./markdown/markdown.component";
import {ArticleComponent} from "./article/article.component";


const routes: Routes = [
  {path: 'home', component: IndexComponent},
  {path: '', component: IndexComponent},
  {path: 'md', component: MarkdownComponent},
  {path: 'article/:id', component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
