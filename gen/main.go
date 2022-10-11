package main

import (
	"fmt"
	"html/template"
	"io/fs"
	"os"
	"path/filepath"
)

type FrontMatter struct {
	Title  string `yaml:"title"`
	Layout string `yaml:"layout"`
}

func main() {
	err := realMain()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}

func processFile(in string, out string) error {
	dir := filepath.Dir(out)
	err := os.MkdirAll(dir, 0755)
	if err != nil {
		return err
	}

	ext := filepath.Ext(in)
	if ext == ".html" {
		w, err := os.Create(out)
		if err != nil {
			return err
		}
		defer w.Close()

		tp, err := template.New("index.html").Funcs(template.FuncMap{
			"include": func(path string) (template.HTML, error) {
				dir := filepath.Dir(in)
				return processMarkdownInclude(filepath.Join(dir, path))
			},
		}).ParseFiles(in)
		if err != nil {
			return fmt.Errorf("failed to parse %s: %w", in, err)
		}

		err = tp.ExecuteTemplate(w, "index.html", 1)
		if err != nil {
			return fmt.Errorf("failed to execute %s: %w", in, err)
		}
	} else if ext == ".md" {
		var err error
		out, err = processMarkdown(in, out)
		if err != nil {
			return err
		}
	}

	fmt.Printf("process %s to generate %s\n", in, out)
	return nil

}

func realMain() error {
	src := os.Args[1]
	dest := "dist"

	err := os.MkdirAll(dest, 0755)
	if err != nil {
		return err
	}

	return filepath.Walk(src, func(path string, info fs.FileInfo, err error) error {
		stat, err := os.Stat(path)
		if err != nil {
			return err
		}
		if stat.IsDir() {
			return nil
		}

		rel, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}

		return processFile(path, filepath.Join(dest, rel))
	})
}
