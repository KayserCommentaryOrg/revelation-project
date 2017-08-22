module.exports = addAxisPointsToTimelineData

function addAxisPointsToTimelineData(axisPoints, timelineData) {
	let minAxisPoint = null
	let maxAxisPoint = null

	const amdToAxisPoint = axisPoints.reduce((map, axis) => {
		if (!minAxisPoint || minAxisPoint > axis.axisPoint) {
			minAxisPoint = axis.axisPoint
		}
		if (!maxAxisPoint || maxAxisPoint < axis.axisPoint) {
			maxAxisPoint = axis.axisPoint
		}

		map[axis.amd] = axis.axisPoint
		return map
	}, Object.create(null))

	return timelineData.map(data => {
		if (data.amd) {
			return Object.assign({
				axis: {
					start: amdToAxisPoint[data.amd.start] || minAxisPoint,
					end: amdToAxisPoint[data.amd.end] || maxAxisPoint,
					cutOffAtStart: !amdToAxisPoint[data.amd.start],
					cutOffAtEnd: !amdToAxisPoint[data.amd.end],
				}
			}, data)
		} else {
			return data
		}
	})
}
