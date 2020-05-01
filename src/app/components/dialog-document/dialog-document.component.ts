import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MyErrorStateMatcher} from '../../Validator/validator'
import { Router } from '@angular/router';

import {Document} from '../create-document/create-document.component'
import {DocumentsService, DocumentVersionService} from '../../services/documents.service'

interface DocVersion{
  paramsId: string,
  comment: string,
  document: string,
  autor: string,
  editor: string,
  text: string,
  image: Array<string>
}

@Component({
  selector: 'app-dialog-document',
  templateUrl: './dialog-document.component.html',
  styleUrls: ['./dialog-document.component.css']
})
export class DialogDocumentComponent implements OnInit {

  formDoc: FormGroup
  formComent: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    public documentsService: DocumentsService,
    public versionService: DocumentVersionService,
    public dialogRef: MatDialogRef<DialogDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public document: Document, 
    @Inject(MAT_DIALOG_DATA) public version: DocVersion) {

      this.formDoc = formBuilder.group({
        name: this.formBuilder.control("", [Validators.required]),
        autor: this.formBuilder.control(document.documentUser,[])
      })

      this.formComent = formBuilder.group({
        comment: this.formBuilder.control("", [Validators.required])
        })
    }
  
    matcher = new MyErrorStateMatcher();
  

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(formDoc){  
    if (!this.version.paramsId) {
      this.documentsService.postDocument(formDoc)
       .subscribe()    
    } else {  
      let formData = new FormData();
          formData.append('coment', this.formComent.value.comment);
          formData.append('document', this.version.document);
          formData.append('autor', this.version.autor);
          formData.append('editor', this.version.editor);
          formData.append('text', this.version.text);
          
          let arrayFiles = this.version.image
          for (let index = 0; index < arrayFiles.length; index++) {
            formData.append('image', arrayFiles[index]) ;  
          }     

      this.versionService.putDocumentVersion(formData).subscribe() 
      this.router.navigate(['/documents-shared'])
    }
  }

  clear(){}
}