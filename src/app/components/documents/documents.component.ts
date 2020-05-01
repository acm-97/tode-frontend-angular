import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

import { DocumentsService, DocumentVersionService } from '../../services/documents.service';
import { DocumentVersion, Documents } from '../../models/documents';
import { BottomSheetCommentComponent } from '../bottom-sheet-comment/bottom-sheet-comment.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentVersionService]
})
export class DocumentsComponent implements OnInit, OnChanges {

  dataSource ;
  displayedColumns: string[] = [
    "article",
    "autor",
    "editor",
    "coment",
    "updatedAt",
    "options"
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  panelOpenState = false;  

  constructor(
    public documentService: DocumentsService,
    public versionService: DocumentVersionService,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.getDocuments()
  }

  ngOnChanges() {
    this.getDocuments();
  }

  openBottomSheet( _id ): void {
    this._bottomSheet.open(BottomSheetCommentComponent, {
      data: { id: [_id] },
    });
  }

  getDocuments() {
    var doc , last;
    var lastVersions = new Array();
    var documents = new Array();

    this.versionService.getDocumentsVersions()
    .subscribe(res => {      
      for (var i = 0; i < res.last.length; i++) {
        if (res.last[i]) {
          lastVersions.push(res.last[i]);
        }
      }     

      this.documentService.getDocuments()
    .subscribe( res => {        
      for (var i = 0; i < res.docs.length; i++) {
          doc = res.docs[i] as Documents
        for (let j = 0; j < res.docs.length; j++) {
            last = lastVersions[j] as DocumentVersion                     
          if (doc && last && doc._id.toString() === last.document._id.toString()) {
            documents.push(doc)  
            this.documentService.documents = documents                    
          }          
        }
      }
    })            
          this.dataSource = new MatTableDataSource<DocumentVersion>(lastVersions) ;
          this.dataSource.paginator = this.paginator;
        })  
  }

  deleteDocument(_id){
    this.versionService.deleteDocumentVersion(_id)
    .subscribe( res => {
      this.getDocuments()      
      console.log(res);
      
    })
  }
}
