import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { RouterModule } from '@angular/router';
import { PostFooterComponent } from './components/post-footer/post-footer.component';
import { SharedModule } from '../shared/shared.module';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page, PostComponent, PostContentComponent, PostFooterComponent, AddPostComponent],
})
export class Tab1PageModule {}
