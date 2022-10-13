package main

import (
	"io"
	"os"
)

func (g *gen) processNormalFile(in, out string) (string, error) {
	w, err := os.Create(out)
	if err != nil {
		return "", err
	}
	defer w.Close()

	r, err := os.Open(in)
	if err != nil {
		return "", err
	}
	defer w.Close()

	_, err = io.Copy(w, r)
	return out, err
}
