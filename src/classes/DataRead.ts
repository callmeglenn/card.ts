import { createCanvas, loadImage, SKRSContext2D } from '@napi-rs/canvas';
import Data from './Data';
class DataRead extends Data {
	public name: string
	public series: string
	public print: number
	constructor(Data: Data) {
		super()
		for (const property in Data) this[property] = Data[property]
	}
	public async image() {
		const canvas = createCanvas(300, 450)
		const ctx = canvas.getContext("2d")
		await this.drawCard(ctx, 0, 0)
		return await canvas.encode('png')
	}
	private async drawCard(ctx: SKRSContext2D, x: number, y: number): Promise<void> {
		await this.drawCharacter(ctx, x, y)
		await this.drawFrame(ctx, x, y)
		this.write(ctx, x, 232, y, 360, String(this.print), "arial", 13, "#ffffff")
		this.write(ctx, x, 150, y, 33, this.name, "arial", 40, "#ffffff")
		this.write(ctx, x, 150, y, 417, this.series, "arial", 40, "#ffffff")
	}
	private async drawCharacter(ctx: SKRSContext2D, x: number, y: number): Promise<void> {
		const character = await loadImage(`./images/characters/${this.name}.png`)
		ctx.drawImage(character, x, y, 300, 450)
	}
	private async drawFrame(ctx: SKRSContext2D, x: number, y: number): Promise<void> {
		const frame = await loadImage(`./images/frames/frame.png`)
		ctx.drawImage(frame, x, y, 300, 450)
	}
	private async write(ctx: SKRSContext2D, x: number, xOff: number, y: number, yOff: number, text: string, font: string, size: number, color: string): Promise<void> {
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = color

		const { width: maxWidth } = ctx.measureText("MMMMMM")
		size = this.getPixelFit(ctx, text, font, size, maxWidth)
		ctx.font = `${size}px ${font}`
		if (ctx.measureText(text).width > maxWidth + 10) this.wrapText(ctx, text, x + xOff, y + yOff)
		else ctx.fillText(text, x + xOff, y + yOff)
	}
	private getPixelFit(ctx: SKRSContext2D, text: string, font: string, size: number, maxWidth: number) {
		const minSize = size - 20
		ctx.font = `${size}px ${font}`
		let { width } = ctx.measureText(text)
		while (width > maxWidth) {
			size--
			ctx.font = `${size}px ${font}`
			width = ctx.measureText(text).width
			if (size == minSize) return minSize
		}
		return size
	}
	private wrapText(ctx: SKRSContext2D, text: string, x: number, y: number) {
		const texts = text.split(' ')
		const div = Math.floor(texts.length / 2)
		const top = texts.slice(0, div).join(' ')
		const bottom = texts.slice(div, texts.length).join(' ')
		ctx.fillText(top, x, y, y - 12)
		ctx.fillText(bottom, x, y + 12)
	}
}
export default DataRead