import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { SignupComponent } from './features/User/components/signup/signup.component';
import { LoginComponent } from './features/User/components/login/login.component';
import { AdminprofileComponent } from './features/User/components/adminprofile/adminprofile.component';
import { UserprofileComponent } from './features/User/components/userprofile/userprofile.component';
import { EditAdminProfileComponent } from './features/User/components/editadminprofile/editadminprofile.component';
import { EdituserprofileComponent } from './features/User/components/edituserprofile/edituserprofile.component';
import { AdminuserlistComponent } from './features/User/components/adminuserlist/adminuserlist.component';
import { AddadminComponent } from './features/User/components/addadmin/addadmin.component';
import { ForgetpasswordComponent } from './features/User/components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './features/User/components/resetpassword/resetpassword.component';
import { ChatComponent } from './features/User/components/chat/chat.component';

const routes: Routes = [
  { path: 'admin',
    component: AdminLayoutComponent },
  { path: 'user',
    component: UserLayoutComponent
  },
  { path: 'signup',
    component: SignupComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'adminprofile', component: AdminprofileComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'editadminprofile', component: EditAdminProfileComponent },
  { path: 'edituserprofile', component: EdituserprofileComponent },
  { path: 'adminuserlist', component: AdminuserlistComponent },
  { path: 'addadmin', component: AddadminComponent },
  { path: 'forgotpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'askchat', component: ChatComponent },

  
  
  
  
  
  
  
  { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
