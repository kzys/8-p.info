package main

import (
	"fmt"
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

	var path string
	ext := filepath.Ext(in)
	if ext == ".html" {
		p, err := processHTML(in, out)
		if err != nil {
			return err
		}
		path = p
	} else if ext == ".md" {
		p, err := processMarkdown(in, out)
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
