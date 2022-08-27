import { DataParam } from '../typings/types';
declare class Data {
    id: string | null;
    constructor(params?: DataParam);
    create(): this;
}
export default Data;
