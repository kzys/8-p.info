package main

import (
	"os"
	"html/template"
)

type gen struct {
	tp *template.Template
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
