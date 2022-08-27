import Data from './Data';
declare class DataRead extends Data {
    name: string;
    series: string;
    print: number;
    constructor(Data: Data);
    image(): Promise<Buffer>;
    private drawCard;
    private drawCharacter;
    private drawFrame;
    private write;
    private getPixelFit;
    private wrapText;
}
export default DataRead;
