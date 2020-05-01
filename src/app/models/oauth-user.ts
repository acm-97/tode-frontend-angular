export class OauthUser {
    constructor(
        _id= "",
        access_token= "",
        expires_in= 0,
        sceibaId= "",
        name= "",
        email= "",
        _v= 0
        ){
            this._id = _id;
            this.access_token = access_token;
            this.expires_in = expires_in;
            this.sceibaId = sceibaId;
            this.name = name;
            this.email = email;
            _v= _v;

    }

  _id: string;
  access_token: string;
  expires_in: number;
  sceibaId: string;
  name: string;
  email: string;
  _v: number
}
