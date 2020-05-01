import {OauthUser} from '../models/oauth-user'

export class Documents {
    constructor(
        _id = "",
        name = "",
        autor = new OauthUser,
        createdAt = "",
        updatedAt = ""
        ){
            this._id = _id;
            this.name = name;
            this.autor = autor;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            }

    _id: string;
    name: string;
    autor: OauthUser;
    createdAt: string;
    updatedAt: string;
}


export class DocumentVersion {

    constructor( 
        _id = "",
        coment = "",
        autor =  new OauthUser,
        editor = new OauthUser,
        document = new Documents,
        images = [],
        createdAt = "",
        updatedAt = ""
        ){
            this._id = _id;
            this.coment = coment;
            this.autor = autor
            this.editor = editor;
            this.document = document;
            this.images = images;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    
    _id: string;
    coment: string;
    autor: OauthUser;
    editor: OauthUser;
    document: Documents;
    images: Array<string>;
    createdAt: string;
    updatedAt: string;
}