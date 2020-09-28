import Partner from './partner'

export default class  Event
{
    constructor(id = '', date = '', summary = '', title = '', duration = '', number = '', partner = new Partner()){

        this.id = id;
        this.date = date;
        this.summary = summary;
        this.title = title;
        this.duration = duration;
        this.number = number;
        this.partner = partner;

    }

}