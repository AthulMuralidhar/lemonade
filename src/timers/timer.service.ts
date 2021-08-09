import {Timer} from "./timer.interface";
import * as fs from "fs";
import { v4 as uuid} from 'uuid';
import axios from "axios";

// temp store
let timers: Timer[] = [{
    id: 'test',
    hours: 123,
    minutes: 452,
    seconds: 234,
    url: 'http://www.google.com',
    createdAt: new Date()
}]

// service functions
export const find = async (id: string): Promise<Timer | undefined> => timers.find(item=> item.id === id)

export const writeToFile = () => {
    const fileName = new Date().toString()
    fs.writeFileSync(`${fileName}.json`, JSON.stringify(timers))
    console.log('writing files to disk')
    console.log('Shutting down gracefully...')
}

export const create = async (timer: Omit<Timer, 'id'| 'createdAt'>) => {
    const id =  uuid();
    const createdAt = new Date()

    timers.push({
        id,
        createdAt,
        ...timer
    })
    await execute(id)
    return {id: id}
}

export const findAll = async (): Promise<Timer[]> => timers;

export const execute = async (id: string, override?: boolean) => {
    const timer = timers.find(item=> item.id === id) ?? {hours: 0, seconds: 0, minutes: 0, url: ''};
    let timeOutInMS = timer?.hours * 3600000 + timer?.minutes * 60000 + timer?.seconds * 1000

    if (override) {
        timeOutInMS = 5
    }

    setTimeout(async () => {
        try {
            const response = await axios.get(timer.url);
            console.log("response sent")
        } catch (axiosErr) {
            console.log(axiosErr)
        }
    },timeOutInMS)
}

