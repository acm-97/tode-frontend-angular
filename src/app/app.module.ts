import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OauthUserComponent,
  PermisionsComponent,
  NotificationsComponent,
  ChatComponent,
  DocumentsComponent,
  HomeComponent,
  DialogDocumentComponent,
  RequestsComponent } from './components/index';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider'
import {MatButtonModule} from '@angular/material/button';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentsSharedComponent } from './components/documents-shared/documents-shared.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge'

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MomentModule } from 'ngx-moment';
import { BottomSheetCommentComponent } from './components/bottom-sheet-comment/bottom-sheet-comment.component';
import { InterceptorService } from './services/interceptor.service';
import { MessageSnackBarService } from './services/message-snack-bar.service';



@NgModule({
  declarations: [
    AppComponent,
    OauthUserComponent,
    PermisionsComponent,
    NotificationsComponent,
    ChatComponent,
    DocumentsComponent,
    HomeComponent,
    CreateDocumentComponent,
    DocumentsSharedComponent,
    DialogDocumentComponent,
    BottomSheetCommentComponent,
    RequestsComponent
  ],
  imports: [
    //AngularModules
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    //MaterialComponents
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatListModule,
    MatTabsModule, 
    MatAutocompleteModule,
    MatChipsModule,   
    MatSnackBarModule,
    MatBadgeModule,

    //external modules for templates
    MaterialFileInputModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  providers: [
    MessageSnackBarService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
