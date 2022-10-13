package main

import (
	"fmt"
	"html/template"
	"io/fs"
	"os"
	"path/filepath"
)

const outDir = "v4_out"

type Params struct {
	Title  string `yaml:"title"`
	Layout string `yaml:"layout"`
	Root   string
	Body   template.HTML
}

func main() {
	err := realMain()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}

func (g *gen) processFile(in string, out string) error {
	dir := filepath.Dir(out)
	err := os.MkdirAll(dir, 0755)
	if err != nil {
		return err
	}

	var path string
	ext := filepath.Ext(in)
	if ext == ".html" {
		p, err := g.processHTML(in, out)
		if err != nil {
			return err
		}
		path = p
	} else if ext == ".md" {
		p, err := g.processMarkdown(in, out)
		if err != nil {
			return err
		}
		path = p
	} else if ext == ".css" {
		p, err := g.processNormalFile(in, out)
		if err != nil {
			return err
		}
		path = p
	}

	fmt.Printf("process %s to generate %s\n", in, path)
	return nil

}

func realMain() error {
	src := os.Args[1]
	dest := outDir

	err := os.MkdirAll(dest, 0755)
	if err != nil {
		return err
	}

	g := newGen()

	tp, err := template.New("").ParseFiles("v4_layout/wrapper.html")
	if err != nil {
		return err
	}
	g.tp = tp

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

		return g.processFile(path, filepath.Join(dest, rel))
	})
}
