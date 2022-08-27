import Data from '../classes/Data';
export interface DataParam {
    id: string;
}
export interface DataReadParam extends DataParam {
    name: string;
    series: string;
    print: number;
}
export interface CardParam {
    name: string;
    collection?: Map<string, Data>;
}
