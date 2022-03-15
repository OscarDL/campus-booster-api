"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delays = void 0;
const cron_1 = require("cron");
exports.Delays = {
    'every second': '* * * * * *',
    'every day': '1/ * * * * *'
};
class CronService {
    constructor(delay, task) {
        this._timezone = 'Europe/Paris';
        this._cron = new cron_1.CronJob(exports.Delays[delay], task, null, true, this._timezone);
    }
    start() {
        return this._cron.start();
    }
    stop() {
        return this._cron.stop();
    }
    isRunning() {
        return !!this._cron.running;
    }
}
exports.default = CronService;
