import { Category } from "./category";

export class Quiz {
    id!:number
    title!:string;
    description!:string;
    maxMarks!:number;
    numberOfQuestion!:number;
    active!:boolean;
    category!:Category;
}
