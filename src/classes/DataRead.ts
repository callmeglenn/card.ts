import { Canvas, createCanvas, loadImage, SKRSContext2D } from '@napi-rs/canvas';
import Data from './Data';
class DataRead extends Data {
	public name: string
	public series: string
	public print: number
	private canvas: Canvas = createCanvas(300, 450)
	private ctx: SKRSContext2D = this.canvas.getContext("2d")
	constructor(Data: Data) {
		super()
		for (const property in Data) this[property] = Data[property]
	}
	public async image(): Promise<Canvas> {
		await this.drawCard()
		return this.canvas
	}
	private async drawCard(): Promise<void> {
		await this.drawCharacter()
		await this.drawFrame()
		this.write(232, 360, String(this.print), "arial", 13, "#ffffff")
		this.write(150, 35, this.name, "arial", 40, "#ffffff")
		this.write(150, 417, this.series, "arial", 40, "#ffffff")
	}
	private async drawCharacter(): Promise<void> {
		const character = await loadImage(`./images/characters/${this.name}.png`)
		this.ctx.drawImage(character, 0, 0, this.canvas.width, this.canvas.height)
	}
	private async drawFrame(): Promise<void> {
		const frame = await loadImage(`./images/frames/frame.png`)
		this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height)
	}
	private async write(x: number, y: number, text: string, font: string, size: number, color: string): Promise<void> {
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillStyle = color

		const { width: maxWidth } = this.ctx.measureText("MMMMMM")
		size = this.getPixelFit(text, font, size, maxWidth)
		this.ctx.font = `${size}px ${font}`
		if (this.ctx.measureText(text).width > maxWidth + 10) this.wrapText(text, x, y)
		else this.ctx.fillText(text, x, y)
	}
	private getPixelFit(text: string, font: string, size: number, maxWidth: number) {
		const minSize = size - 15
		this.ctx.font = `${size}px ${font}`
		let { width } = this.ctx.measureText(text)
		while (width > maxWidth) {
			size--
			this.ctx.font = `${size}px ${font}`
			width = this.ctx.measureText(text).width
			if (size == minSize) return minSize
		}
		return size
	}
	private wrapText(text: string, x: number, y: number) {
		const texts = text.split(' ')
		const div = Math.floor(texts.length / 2)
		const top = texts.slice(0, div).join(' ')
		const bottom = texts.slice(div, texts.length).join(' ')
		this.ctx.fillText(top, x, y - 13)
		this.ctx.fillText(bottom, x, y + 13)
	}
}
export default DataRead