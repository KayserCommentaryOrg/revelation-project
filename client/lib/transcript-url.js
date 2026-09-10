// Sermon transcripts live on the main site as extensionless pages; the `.md`
// in sermons.json would only earn a redirect hop, so strip it here.
export default filename => `https://biblicalblueprints.com/${encodeURI(filename.replace(/\.md$/, ''))}`
