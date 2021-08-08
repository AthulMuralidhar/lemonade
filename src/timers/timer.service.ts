import {Timer} from "./timer.interface";
import * as fs from "fs";
import { v4 as uuid} from 'uuid';

// temp store
let timers: Timer[] = [{
    id: 'test',
    hours: 123,
    minutes: 452,
    seconds: 234,
    url: 'test at toot.com'
}]

// service functions
export const find = async (id: string): Promise<Timer | undefined> => timers.find(item=> item.id === id)

export const writeToFile = () => {
    const fileName = new Date().toString()
    fs.writeFile(`${fileName}.json`, JSON.stringify(timers), (error) =>{
        if (error) {
            console.log('error during writeToFile',error)
        }
    })

}

export const create = async (timer: Omit<Timer, 'id'>) => {
    const id =  uuid();
    timers.push({
        id,
        ...timer
    })
    return find(id)
}

export const findAll = async (): Promise<Timer[]> => timers;