package main

import (
	"fmt"
	"html/template"
	"os"
	"path/filepath"
)

func processHTML(in, out string) (string, error) {
	w, err := os.Create(out)
	if err != nil {
		return "", err
	}
	defer w.Close()

	tp, err := template.New("index.html").Funcs(template.FuncMap{
		"include": func(path string) (template.HTML, error) {
			dir := filepath.Dir(in)
			return processMarkdownInclude(filepath.Join(dir, path))
		},
	}).ParseFiles(in)
	if err != nil {
		return "", fmt.Errorf("failed to parse %s: %w", in, err)
	}

	err = tp.ExecuteTemplate(w, "index.html", 1)
	if err != nil {
		return "", fmt.Errorf("failed to execute %s: %w", in, err)
	}

	return out, nil
}
