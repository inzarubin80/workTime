import Partner from './partner'
import Project from './project'


export default class  Event
{
    constructor(id = '', date = '', deletionMark=false, summary = '', title = '', duration = '', number = '', partner = new Partner(), project = new Project()){

        this.id = id;
        this.date = date;
        this.summary = summary;
        this.title = title;
        this.duration = duration;
        this.number = number;
        this.partner = partner;
        this.project = project;
        this.deletionMark = deletionMark;
        
        

    }

}