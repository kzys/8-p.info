package main

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v3"
)

func readFrontMatter(path string) ([]byte, Params, error) {
	var params Params

	b, err := os.ReadFile(path)
	if err != nil {
		return nil, params, err
	}
	if string(b[0:4]) == "---\n" {
		xs := strings.SplitN(string(b), "---", 3)
		b = []byte(xs[2])
		err = yaml.Unmarshal([]byte(xs[1]), &params)
		if err != nil {
			return nil, params, err
		}
	}
	return b, params, nil
}

func (g *gen) processHTML(in, out string) (string, error) {
	b, params, err := readFrontMatter(in)
	if err != nil {
		return "", err
	}

	tp, err := template.New("index.html").Funcs(template.FuncMap{
		"include": func(path string) (template.HTML, error) {
			dir := filepath.Dir(in)
			return g.processMarkdownInclude(filepath.Join(dir, path))
		},
	}).Parse(string(b))
	if err != nil {
		return "", fmt.Errorf("failed to parse %s: %w", in, err)
	}

	body := &bytes.Buffer{}
	err = tp.ExecuteTemplate(body, "index.html", 1)
	if err != nil {
		return "", fmt.Errorf("failed to execute %s: %w", in, err)
	}

	params.Root = "/"
	params.Body = template.HTML(body.String())
	params.BodyClass = in

	err = g.render(out, params)
	if err != nil {
		return "", err
	}
	return out, nil
}
