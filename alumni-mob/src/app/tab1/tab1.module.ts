import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PostComponent } from './components/post/post.component';
import { InternComponent } from './components/intern/intern.component';
import { PostContentComponent } from './components/post-content/post-content.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    DatePipe
  ],
  declarations: [Tab1Page, PostComponent, InternComponent, PostContentComponent]
})
export class Tab1PageModule {}
