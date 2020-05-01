import { OauthUser } from 'src/app/models/oauth-user';

export class Chat {

    constructor(
        sender = new OauthUser,
        content = "",
        document = "",
        createdAt = "",
        UpdatedAt = ""
    ) {
        sender = sender;
        content = content;
        document = document;
        createdAt = createdAt;
        UpdatedAt = UpdatedAt;
    }

    sender: OauthUser;
    content: string;
    document: string;
    createdAt: string;
    UpdatedAt: string;
}
