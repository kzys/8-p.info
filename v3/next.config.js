const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})
module.exports = withMDX({
    trailingSlash: true,
    pageExtensions: ['js', 'tsx', 'md', 'mdx'],
})