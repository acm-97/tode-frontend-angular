import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import {OauthUserService} from '../../services/oauth-user.service'
import { DocumentVersion } from '../../models/documents';
import { DocumentsService, DocumentVersionService } from '../../services/documents.service';
import { Permisions } from 'src/app/models/permisions';
import { OauthUser } from '../../models/oauth-user';
import { InterceptorService } from '../../services/interceptor.service';
import { PermisionsService } from 'src/app/services/permisions.service';

@Component({
  selector: 'app-permisions',
  templateUrl: './permisions.component.html',
  styleUrls: ['./permisions.component.css']  
})

export class PermisionsComponent implements OnInit, OnChanges {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  nameCtrl: FormGroup;
  filterednames: Observable<string[]>;
  names: string[] = [];
  allnames: string[];

  auth: OauthUser = JSON.parse(localStorage.getItem('auth'));
  aceptedPermisions: Permisions[];
  pendingPermisions: Permisions[];
  withPermisions: Permisions[];

  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor( 
    public error: InterceptorService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: OauthUserService,
    public documentService: DocumentsService,
    private version: DocumentVersionService,
    private permisionService: PermisionsService) {
    
      
  }

  ngOnInit(){
   this.getPermisionsByDocument();

    this.nameCtrl = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      document: this.formBuilder.control('', [Validators.required]),

    })
    this.onChanges()
  }

  ngOnChanges() {
    this.getPermisionsByDocument();
  }

   getPermisionsByDocument(){
     this.version.getDocumentVersionById(this.route.snapshot.params.id)
      .subscribe( res => {
        this.version.selectedVersion = res as DocumentVersion;
      this.permisionService.getPermisonsByDocument(this.version.selectedVersion.document._id)
      .subscribe( res => {
        this.permisionService.permisions = res as Permisions[];

        this.aceptedPermisions = new Array;
        this.pendingPermisions = new Array;
        for (let i = 0; i < this.permisionService.permisions.length; i++) {
          this.permisionService.selectedPermision = this.permisionService.permisions[i] as Permisions;
          
          if (this.permisionService.selectedPermision.requestAcepted == true) {
            this.aceptedPermisions.push(this.permisionService.selectedPermision);
          }else{
            this.pendingPermisions.push(this.permisionService.selectedPermision);
          }
        }
      })
    })
  }

  onChanges(){
    this.nameCtrl.get('name').valueChanges.subscribe(val => {
        this.authService.getUsersToPermission(val)
        .subscribe( res => {
          this.allnames = res as string[];
         /*  let names = res as string[];          
          for (let i = 0; i < names.length; i++) {
            if (names[i]) {              
              this.allnames.push(names[i]);  
            }                      
          } */
        if (this.nameCtrl.valueChanges != undefined) {
          this.filterednames = this.nameCtrl.valueChanges.pipe(
            startWith(null),
            map((name: string | null) => name ? this._filter(name) : this.allnames.slice()));
        }else{
          console.log("undefined");
        }
    })
    });
  }

  async onSubmit(e){   
    e.preventDefault();
      /* this.version.getDocumentVersionById(this.route.snapshot.params.id)
      .subscribe( res => {
        this.version.selectedVersion = res as DocumentVersion; */
          this.nameCtrl.get('name').setValue(this.names);
          this.nameCtrl.get('document').setValue(this.version.selectedVersion.document._id);
       await this.permisionService.postPermision( this.nameCtrl.value )
        .subscribe(res => {
          this.nameCtrl.get('name').setValue('');
          this.nameCtrl.get('document').setValue('');
          })
          console.log(this.error.error)
      /* }) */
      this.getPermisionsByDocument();
  }

  deletePermision(_id) {
    this.permisionService.deletePermision(_id)
    .subscribe();

    this.getPermisionsByDocument()
  }

  addName(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our name
    if ((value || '').trim()) {
      this.names.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.nameCtrl.get('name').setValue(null);
  }

  removeName(name: string): void {
    const index = this.names.indexOf(name);

    if (index >= 0) {
      this.names.splice(index, 1);
    }
  }

  selectedName(event: MatAutocompleteSelectedEvent): void {
    this.names.push(event.option.viewValue);
    this.nameInput.nativeElement.value = '';
    this.nameCtrl.get('name').setValue(null);
  }

  private _filter(value: string): string[] {
    //const filterValue = value.toLowerCase();

    return this.allnames.filter(name => name.toLowerCase().indexOf(value) === 0);
  }

}
