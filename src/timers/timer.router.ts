import express, {Request, Response} from "express";
import moment from "moment";
import {Timer} from "./timer.interface";
import * as service from './timer.service'

// router
export const router = express.Router();

// controllers
router.get('/timers/:id', async (req: Request, resp: Response) =>{
    const id: string = req.params.id
    try {
        const timer = await service.find(id);

        if (timer) {
            const now = moment()
            let timeLeft = now.diff(moment(timer.createdAt).add({hours:timer.hours,minutes:timer.minutes, seconds: timer.seconds}))

            if (timeLeft < 0) {
                timeLeft = Math.abs(timeLeft)
            } else if (timeLeft > 0) {
                timeLeft = 0
            }

            return resp.status(200).send({
                id: timer.id,
                time_left: timeLeft
            });
        }

        resp.status(404).send("timer not found");
    } catch (e) {
        resp.status(500).send(e.message);
    }
});


router.post("/timers", async (req: Request, resp: Response) => {
    try {
        const timer = req.body;
        const newTimer = await service.create(timer);

        resp.status(201).json(newTimer);
    } catch (e) {
        resp.status(500).send(e.message);
    }
});

router.get("/", async (req: Request, resp: Response) => {
    try {
        const timers: Timer[] = await service.findAll();

        resp.status(200).send(timers);
    } catch (e) {
        resp.status(500).send(e.message);
    }
});

