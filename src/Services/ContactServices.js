import axios from 'axios';

export class ContactServices{
    static serverURL = ` http://localhost:3002`;

    static getGroups(){
        const dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }

    static getGroup(contacts){
        const groupId = contacts.group;
        const dataURL = `${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }

    static getAllContacts(){
        const dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }

    static getContact(contactId){
        const dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static createContact(contacts){
        const dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL, contacts);
    }

    static updateContact(contacts, contactId){
        const dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL, contacts);
    }

    static deleteContact(contactId){
        const dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }
}

