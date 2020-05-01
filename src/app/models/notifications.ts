import { OauthUser } from 'src/app/models/oauth-user';
import { Documents } from './documents';

export class Notifications {

    constructor(
        _id= '',
        notificationSied= false,
        notification= '',
        forPermisions= new OauthUser,
        document= new Documents,
        createdAt= '',
        updatedAt= '',
            ){
            _id = _id
            notificationSied = notificationSied
            notification = notification
            forPermisions = forPermisions
            document = document
            createdAt = createdAt
            updatedAt = updatedAt
            }

    
     _id: string;
     notificationSied: boolean;
     notification: string;
     forPermisions: OauthUser;
     document: Document;
     createdAt: string;
     updatedAt: string;
}

export class Requests {
    constructor(
        _id= '',
        notificationSied= false,
        notification= '',
        toUser= new OauthUser,
        document= new Documents,
        createdAt= '',
        updatedAt= '',
            ){
            _id = _id
            notificationSied = notificationSied
            notification = notification
            toUser = toUser
            document = document
            createdAt = createdAt
            updatedAt = updatedAt
            }

    
     _id: string;
     notificationSied: boolean;
     notification: string;
     toUser: OauthUser;
     document: Document;
     createdAt: string;
     updatedAt: string;
}
