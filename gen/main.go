package main

import (
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
)

func main() {
	err := realMain()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
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
		out := filepath.Join(dest, rel)

		dir := filepath.Dir(out)
		err = os.MkdirAll(dir, 0755)
		if err != nil {
			return err
		}

		w, err := os.Create(out)
		if err != nil {
			return err
		}
		defer w.Close()

		r, err := os.Open(path)
		if err != nil {
			return err
		}
		defer r.Close()

		_, err = io.Copy(w, r)
		if err != nil {
			return err
		}

		fmt.Printf("process %s to generate %s\n", path, out)
		return nil
	})
}
