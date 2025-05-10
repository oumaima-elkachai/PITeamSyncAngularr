import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { UserHeaderComponent } from './components/user/user-header/user-header.component';
import { UserFooterComponent } from './components/user/user-footer/user-footer.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
    declarations: [
      AdminHeaderComponent,
      AdminFooterComponent,
      AdminSidebarComponent,
      UserHeaderComponent,
      UserFooterComponent,
      UserHomeComponent,
      AdminHomeComponent,
      HighlightPipe
    ],
    imports: [
      CommonModule,
      RouterModule // Needed for <router-outlet>
    ],
    exports: [ // Export components so they can be used in other modules
      AdminHeaderComponent,
      AdminFooterComponent,
      AdminSidebarComponent,
      UserHeaderComponent,
      UserFooterComponent,
      UserHomeComponent,
      AdminHomeComponent,
      HighlightPipe
    ]
  })
  export class SharedModule { }
