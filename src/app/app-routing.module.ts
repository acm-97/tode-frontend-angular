import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent,
  DocumentsComponent,
  DocumentsSharedComponent,
  CreateDocumentComponent,
  OauthUserComponent,
  PermisionsComponent,
  TextureComponent} from './components/index'
import {OauthGuard} from './oauth.guard'
import {ChatComponent} from './components/chat/chat.component'
const routes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  { path: 'documents', 
    component: DocumentsComponent, 
    canActivate:[OauthGuard] 
  },
  { path: 'documents-shared', 
    component: DocumentsSharedComponent, 
    canActivate:[OauthGuard] 
  },
  { path: 'edit-document/:id', 
    component: CreateDocumentComponent, 
    canActivate:[OauthGuard] 
  },
  { path: 'create-document', 
    component: CreateDocumentComponent, 
    canActivate:[OauthGuard] 
  },
  { path: 'perfil', 
    component: OauthUserComponent, 
    canActivate:[OauthGuard] 
  },
  { path: 'permisions/:id', 
    component: PermisionsComponent, 
    canActivate:[OauthGuard] 
  },
  { path: 'texture', 
    component: TextureComponent, 
    /* canActivate:[OauthGuard] */ 
  },
  { path: 'chat', 
    component: ChatComponent, 
    /* canActivate:[OauthGuard] */ 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [OauthGuard]
})
export class AppRoutingModule { }
