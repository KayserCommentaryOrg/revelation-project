export default function sectionLabel(section) {
	return section.prime ? `${section.identifier}′` : section.identifier
}
