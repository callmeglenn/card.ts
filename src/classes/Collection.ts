import Series from './Series';
import Data from './Data';
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
}
export default Collection