import { config, fields, collection } from '@keystatic/core';

export default config({
	storage:
		process.env.NODE_ENV === 'development'
			? { kind: 'local' }
			: {
					kind: 'github',
					repo: { owner: 'pelogia', name: 'searchirl-ie' },
				},
	collections: {
		blog: collection({
			label: 'Blog Posts',
			path: 'src/content/blog/*/',
			slugField: 'title',
			format: { contentField: 'content' },
			entryLayout: 'content',
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({
					label: 'Description (meta description)',
					multiline: true,
					validation: { length: { min: 1 } },
				}),
				pubDate: fields.date({ label: 'Publish date' }),
				updatedDate: fields.date({ label: 'Updated date' }),
				heroImage: fields.image({
					label: 'Hero image',
					directory: 'src/assets/uploads/blog',
					publicPath: '../../../assets/uploads/blog/',
				}),
				heroImageAlt: fields.text({ label: 'Hero image alt text' }),
				content: fields.markdoc({
					label: 'Content',
					extension: 'md',
					options: {
						bold: true,
						italic: true,
						strikethrough: true,
						code: true,
						heading: [2, 3, 4],
						blockquote: true,
						orderedList: true,
						unorderedList: true,
						link: true,
						image: {
							directory: 'src/assets/uploads/blog',
							publicPath: '../../../assets/uploads/blog/',
						},
					},
				}),
			},
		}),
	},
});
