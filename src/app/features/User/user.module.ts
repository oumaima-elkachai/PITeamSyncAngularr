import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminprofileComponent } from './components/adminprofile/adminprofile.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditAdminProfileComponent } from './components/editadminprofile/editadminprofile.component';
import { EdituserprofileComponent } from './components/edituserprofile/edituserprofile.component';
import { AdminuserlistComponent } from './components/adminuserlist/adminuserlist.component';
import { AddadminComponent } from './components/addadmin/addadmin.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
    declarations: [
      AdminprofileComponent,
      EditAdminProfileComponent,
      UserprofileComponent,
      LoginComponent, // ✅ Add missing components
      SignupComponent, EdituserprofileComponent, AdminuserlistComponent, AddadminComponent, ForgetpasswordComponent, ResetpasswordComponent, ChatComponent,
     // SharedModule 
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      SharedModule // Import SharedModule for header and sidebar components
    ]
  })
  export class UserModule { }