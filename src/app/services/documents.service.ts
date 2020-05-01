import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Documents, DocumentVersion } from '../models/documents';
import {tokenConfig} from '../services/oauth-user.service';

export interface Docs {
  docs: Array<object>;
  perms: Array<object>;
  permsShared: Array<object>;
}

export interface Versions {
  docs_version: Array<object>;
  last: Array<object>;
  lastShared: Array<object>;
}

@Injectable({
  providedIn: 'root'
})

//Services for Documents
export class DocumentsService {

  selectedDocument: Documents;
  documents: Documents[];  

  constructor( private http: HttpClient ) {
    this.selectedDocument = new Documents();   
   }

  getDocuments() {    
    return this.http.get<Docs>('/api/documents', tokenConfig());
  }

  getDocumentById(_id) {    
    return this.http.get(`/api/document/${_id}`, tokenConfig());
  }
  
  getDocumentByName(name) {    
    return this.http.get(`/api/document_ByName/${name}`);
  }

  updateDocumentName(documentId, documentName) {
    return this.http.get(`/api/updateDocumentName?id=${documentId}&name=${documentName}`);
  }

  postDocument( document: Documents) {
    return this.http.post('/api/new_document', document);
  }

  deleteDocument( _id ){
    return this.http.delete(`/api/delete_document/${_id}`);
  } 

}

@Injectable({
  providedIn: 'root'
})

// Services for Documents Versions
export class DocumentVersionService {

  selectedVersion: DocumentVersion;
  verersions: DocumentVersion[];

  constructor( public http: HttpClient) {

    this.selectedVersion = new DocumentVersion();
   }

  getDocumentsVersions() {
    return this.http.get<Versions>('/api/document_version',tokenConfig());
  }

  getDocumentVersionById<DocumentVersion>( _id ) {
    return this.http.get(`/api/document_version/${_id}`, tokenConfig());
  }

  getVersionsById( _id ) {
    return this.http.get<DocumentVersion[]>(`/api/getVersionsById/${_id}`)
  }

  getVersionContent( _id ) {
    return this.http.get(`/api/document_version_content/${_id}`)
  }

  postDocumentVersion( formData ) {
    return this.http.post('/api/new_document_version', formData);
  }

  putDocumentVersion( formData ) {
    return this.http.post('/api/put_document_version', formData);
  }

  deleteDocumentVersion( _id ){
    return this.http.delete(`/api/delete_document_version/${_id}`);
  } 
  
}
