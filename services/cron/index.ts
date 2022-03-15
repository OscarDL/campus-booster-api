import { CronJob } from 'cron';

export const Delays = <const> {
    'every second': '* * * * * *',
    'every day': '1/ * * * * *'
};

export default class CronService<
    T extends typeof Delays,
    K extends keyof T
> {

    protected _cron: CronJob;
    protected _timezone: string = 'Europe/Paris';

    constructor(delay: K, task: () => void | Promise<void>) {
        this._cron = new CronJob(
            Delays[delay as keyof typeof Delays],
            task,
            null, 
            true,
            this._timezone
        );
    }

    public start(): void {
        return this._cron.start();
    }

    public stop(): void {
        return this._cron.stop();
    }

    public isRunning(): boolean {
        return !!this._cron.running;
    }
}