import Series from './Series';
import random from 'random'
import DataRead from './DataRead';
class Collection {
	public series: Map<string, Series>
	constructor(...series: Array<Series>) {
		this.series = new Map(series.map(s => [s.name, s]))
	}
	create(series: string, card: string): DataRead {
		const _series = this.series.get(series)
		if (!_series) throw Error(`There is no series with the name: ${series}`)
		const { id } = _series.create(card)
		const data = this.get(id as string)
		return data as DataRead
	}
	get(id: string): DataRead | null {
		let result: DataRead | null = null
		for (const series of [...this.series.values()]) {
			const data = series.get(id)
			if (data) {
				result = data
				break
			}			
		}
		return result
	}
	/** Retrieve newly created card(s) by random */
	random(number: number): DataRead | Array<DataRead> {
		const result: Array<DataRead> = []
		const seriesNames = [...this.series.keys()]
		while (result.length < number) {
			const series = seriesNames[random.int(0, seriesNames.length - 1)]
			const cardNames = [...this.series.get(series).cards.keys()].filter(name => !result.map(c => c.name).includes(name))
			if (!cardNames.length) throw Error("Not enough cards in the collection.")
			const card = cardNames[random.int(0, cardNames.length - 1)]
			result.push(this.create(series, card))
		}
		return result.length > 1 ? result : result[0]
	}
}
export default Collection