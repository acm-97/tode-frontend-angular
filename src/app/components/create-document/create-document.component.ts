import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';

import { DialogDocumentComponent } from '../dialog-document/dialog-document.component';
import { MyErrorStateMatcher } from '../../Validator/validator';
import { OauthUser } from '../../models/oauth-user';
import { Documents, DocumentVersion } from '../../models/documents';
import { DocumentsService, DocumentVersionService } from '../../services/documents.service';


export interface Document {
  name: string;
  documentUser: string;
}

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit, OnDestroy {

  
  comment: string = "Original";
  content: string = "";
  image: Array<string> = [];
  name: string;
  documentUser: OauthUser = JSON.parse(localStorage.getItem("auth"));
  document: Documents;

  matcher = new MyErrorStateMatcher
  formContent: FormGroup;
  paramsId: string = this.route.snapshot.params.id;
  data: object 

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public documentService: DocumentsService,
    public versionService: DocumentVersionService,
    public dialog: MatDialog) {   
           
      this.formContent = formBuilder.group({
        content: this.formBuilder.control("", []),
        image: this.formBuilder.control('', [])
      })
  }

 async ngOnInit() {
   localStorage.setItem('visibleChat', JSON.stringify(true));

    if (!this.paramsId) { 
      this.data = { name: this.name, documentUser: this.documentUser._id }     
      this.openDialog(this.data);
      this.initForm(this.content, this.image);  
    }else{
     await this.versionService.getDocumentVersionById(this.paramsId)
      .subscribe( res => {
          this.versionService.selectedVersion = res as DocumentVersion;
        this.versionService.getVersionContent( this.paramsId )
        .subscribe( res => {
            this.content = res as string  ;  
            this.initForm(this.content, this.image);
        })
      })
    }
  } ; 

ngOnDestroy(){
  localStorage.setItem('visibleChat', JSON.stringify(false));
}

  openDialog(data): void {
        
    const dialogRef = this.dialog.open(DialogDocumentComponent, {
      width: '50%',
      data: this.data,
      backdropClass: 'backdropBackground',
      disableClose: true
    });

    if (!this.paramsId) {  
      dialogRef.afterClosed().subscribe(res => {
        this.name = res;
      });
    } else { 
      dialogRef.afterClosed().subscribe(res => {
        this.comment = res;
      });
    }    
  };

  initForm(content, image) {
    this.formContent = this.formBuilder.group({
      content: this.formBuilder.control(content, [Validators.required]),
      image: this.formBuilder.control(image, [Validators.nullValidator])
    })
  };

  onSubmit(e) {     
     e.preventDefault();
     if (!this.paramsId) {       
      this.documentService.getDocumentByName(this.name)
      .subscribe(res => {        
        this.document = res as Documents   

        let formData = new FormData();
        formData.append('coment', this.comment);
        formData.append('autor', this.documentUser._id);
        formData.append('editor', this.documentUser._id);
        formData.append('document', this.document._id);
        formData.append('text', this.formContent.value.content);

        let files = this.formContent.value.image
        let arrayFiles = files.files
        for (let index = 0; index < arrayFiles.length; index++) {
          formData.append('image', arrayFiles[index]) ;  
        }     

        this.versionService.postDocumentVersion(formData).subscribe();
        this.router.navigate(['/documents']);
     } )
     } else {       
      this.versionService.getDocumentVersionById(this.paramsId)
      .subscribe(res => {        
        this.versionService.selectedVersion = res as DocumentVersion;       
        this.documentService.getDocumentById(this.versionService.selectedVersion.document._id)
        .subscribe( res => {
          this.document = res as Documents
        
          let files = this.formContent.value.image
          let arrayFiles = files.files

          this.data = { 
            paramsId: this.paramsId,
            document: this.document._id,
            autor: this.document.autor._id,
            editor: this.documentUser._id,
            text: this.formContent.value.content,
            image: arrayFiles
          }
          this.openDialog( this.data );
        })
     } )
     }
  };

  onCancel() { 
    this.documentService.getDocumentByName( this.name)
    .subscribe( res =>{
      this.documentService.selectedDocument = res as Documents;
      this.documentService.deleteDocument( this.documentService.selectedDocument._id )
      .subscribe(res => console.log(res)
      )
    }
    )};
}
