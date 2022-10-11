package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/yuin/goldmark"
	"gopkg.in/yaml.v3"
)

func processMarkdown(in, out string) (string, error) {
	path := out[:len(out)-3] + ".html"

	var fm FrontMatter

	b, err := os.ReadFile(in)
	if err != nil {
		return "", err
	}
	if string(b[0:4]) == "---\n" {
		xs := strings.SplitN(string(b), "---", 3)
		b = []byte(xs[2])
		err = yaml.Unmarshal([]byte(xs[1]), &fm)
		if err != nil {
			return "", err
		}
	}

	w, err := os.Create(path)
	if err != nil {
		return "", err
	}
	defer w.Close()

	_, err = w.WriteString(fmt.Sprintf("<title>%s</title>", fm.Title))
	if err != nil {
		return "", err
	}

	if err := goldmark.Convert(b, w); err != nil {
		return "", err
	}
	return path, nil
}
