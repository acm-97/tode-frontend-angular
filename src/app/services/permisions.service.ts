import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {tokenConfig} from '../services/oauth-user.service';
import { Permisions } from '../models/permisions';

@Injectable({
  providedIn: 'root'
})
export class PermisionsService {

  selectedPermision: Permisions;
  permisions: Permisions[];

  constructor( private http: HttpClient ) { 
    this.selectedPermision = new Permisions();
  }

  getPermisonsByDocument( _id ) {
    return this.http.get(`/api/getPermisionsByDocument/${_id}`)
  }

  postPermision(formData) {    
    return this.http.post('/api/new_permision', formData);    
  }

  deletePermision( _id ) {
    return this.http.delete(`/api/delete_permision/${_id}`); 
  }

  cancelPermisionShared( _id ) {
    return this.http.delete(`/api/cancelPermisionShared/${_id}`); 
  }
}
