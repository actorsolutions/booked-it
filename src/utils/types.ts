import {NextApiResponse} from "next";
import {StringLiteral} from "@babel/types";

export interface auditionResponse extends NextApiResponse{
    auditions:Audition[]
}

export interface Audition {
    id: number;
    userId: number;
    createdAt: number;
    date: number;
    project: string;
    company: string;
    callBackDate: number;
    notes: string;
    type: "television"|"film"|"student"|"theater"|"industrial"|"commercial"|"newMedia";
    status:"submitted"|"scheduled"|"auditioned"|"callback"|"booked";
    archived: boolean;
}