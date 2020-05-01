import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MatTableDataSource} from '@angular/material/table';

import { DocumentsService, DocumentVersionService } from '../../services/documents.service';
import { DocumentVersion, Documents } from '../../models/documents';
import { DocumentsComponent } from '../documents/documents.component';

@Component({
  selector: 'app-bottom-sheet-comment',
  templateUrl: './bottom-sheet-comment.component.html',
  styleUrls: ['./bottom-sheet-comment.component.css'],
  providers: [DocumentVersionService]
})
export class BottomSheetCommentComponent implements OnInit {

  dataSource ;
  displayedColumns: string[] = [
    "article",
    "autor",
    "editor",
    "coment",
    "updatedAt",
    "options"
  ];

  constructor(
    public documentService: DocumentsService,
    public versionService: DocumentVersionService,
    private _bottomSheetRef: MatBottomSheetRef<DocumentsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { 
    
  }

  ngOnInit( ): void {
      this.versionService.getVersionsById( this.data.id )
      .subscribe(res => {
        this.versionService.verersions = res as DocumentVersion[];            
        this.dataSource = new MatTableDataSource<DocumentVersion>(this.versionService.verersions);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
