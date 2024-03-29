package main

import (
	"bytes"
	"html/template"
	"os"
	"strings"
)

func (g *gen) processMarkdownInclude(in string) (template.HTML, error) {
	b, err := os.ReadFile(in)
	if err != nil {
		return "", err
	}

	w := &bytes.Buffer{}

	if err := g.md.Convert(b, w); err != nil {
		return "", err
	}
	return template.HTML(w.String()), nil
}

func (g *gen) processMarkdown(in, out string) (string, error) {
	path := out[:len(out)-3] + ".html"

	var params Params

	b, params, err := readFrontMatter(in)
	if err != nil {
		return "", err
	}

	body := &bytes.Buffer{}
	if err := g.md.Convert(b, body); err != nil {
		return "", err
	}

	params.Root = "/"
	class := strings.ReplaceAll(in, "/", "_")
	class = strings.ReplaceAll(class, ".md", "")
	params.BodyClass = class
	params.Body = template.HTML("<main class='markdown'>" + body.String() + "</main>")

	err = g.render(path, params)
	if err != nil {
		return "", err
	}

	return path, nil
}
