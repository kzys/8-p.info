package main

import (
	"bytes"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNew(t *testing.T) {
	g := newGen()
	out := &bytes.Buffer{}
	err := g.md.Convert([]byte("<q>hello</q>"), out)
	require.NoError(t, err)
	assert.Equal(t, "<p><q>hello</q></p>\n", out.String())
}
