import { OauthUser } from './oauth-user';

export class Permisions {
    
    constructor(
        requestAcepted = false,
        _id = "",
        withPermisions = new OauthUser,
        document = "",
        createdAt = "",
        updatedAt = ""
    ){
        this.requestAcepted = requestAcepted;
        this._id= _id;
        this.withPermisions = withPermisions;
        this.document = document;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }

    requestAcepted : boolean;
    _id : string;
    withPermisions : OauthUser;
    document : string;
    createdAt : string;
    updatedAt : string
}
