import { Canvas } from '@napi-rs/canvas';
import Data from './Data';
declare class DataRead extends Data {
    name: string;
    series: string;
    print: number;
    private canvas;
    private ctx;
    constructor(Data: Data);
    image(): Promise<Canvas>;
    private drawCard;
    private drawCharacter;
    private drawFrame;
    private write;
    private getPixelFit;
    private wrapText;
}
export default DataRead;
