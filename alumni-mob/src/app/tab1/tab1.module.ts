import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { headerInternComponent } from '../tab2/headerIntern/headerIntern.component';
import { MainModule } from '../main/main.module';
import { RouterModule } from '@angular/router';
import { InternsComponent } from '../tab2/interns/interns.component';
import { PostFooterComponent } from './components/post-footer/post-footer.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MainModule,
    RouterModule
  ],
  declarations: [Tab1Page, PostComponent, PostContentComponent, PostFooterComponent],
})
export class Tab1PageModule {}
