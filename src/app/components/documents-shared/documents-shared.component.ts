import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

import { DocumentsService, DocumentVersionService } from '../../services/documents.service';
import { DocumentVersion, Documents } from '../../models/documents';
import { BottomSheetCommentComponent } from '../bottom-sheet-comment/bottom-sheet-comment.component';
import { PermisionsService } from 'src/app/services/permisions.service';
import { MessageSnackBarService } from 'src/app/services/message-snack-bar.service';

@Component({
  selector: 'app-documents-shared',
  templateUrl: './documents-shared.component.html',
  styleUrls: ['./documents-shared.component.css']
})
export class DocumentsSharedComponent implements OnInit, OnChanges {

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
    private _bottomSheet: MatBottomSheet,
    private permisionService: PermisionsService,
    private messageSnackBarService: MessageSnackBarService
  ) { }

  ngOnInit(): void {
    this.getDocuments();
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
    var lastVersionsShared = new Array();

    this.versionService.getDocumentsVersions()
    .subscribe(res => {      
      for (var i = 0; i < res.lastShared.length; i++) {
        if (res.lastShared[i]) {
          lastVersionsShared.push(res.lastShared[i]);
        }
      } 
          this.dataSource = new MatTableDataSource<DocumentVersion>(lastVersionsShared) ;
          this.dataSource.paginator = this.paginator;
        })  
  };

  cancelPermision( _id ) {
    this.permisionService.cancelPermisionShared( _id )
    .subscribe( res => {
      this.getDocuments();
      this.messageSnackBarService.openSnackBar('El artículo ya no se mostrará más en esta biblioteca', 'OK');
    })
  }

}
