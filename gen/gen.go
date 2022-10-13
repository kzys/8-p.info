package main

import (
	"html/template"
	"os"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/renderer/html"
)

type gen struct {
	tp *template.Template
	md goldmark.Markdown
}

func newGen() *gen {
	return &gen{
		md: goldmark.New(goldmark.WithRendererOptions(html.WithUnsafe())),
	}
}

func (g *gen) render(path string, params Params) error {
	w, err := os.Create(path)
	if err != nil {
		return err
	}
	defer w.Close()

	params.Root = "/"
	err = g.tp.ExecuteTemplate(w, "wrapper.html", params)
	if err != nil {
		return err
	}
	return nil
}
