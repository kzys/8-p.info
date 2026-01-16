package main

import (
	"bytes"
	"os"
	"path/filepath"
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

func TestReadFrontMatter_ValidSimpleTitle(t *testing.T) {
	tmpDir := t.TempDir()
	testFile := filepath.Join(tmpDir, "test.md")
	content := `---
title: Simple Title
---
# Content here`
	err := os.WriteFile(testFile, []byte(content), 0644)
	require.NoError(t, err)

	body, params, err := readFrontMatter(testFile)
	require.NoError(t, err)
	assert.Equal(t, "Simple Title", params.Title)
	assert.Equal(t, "\n# Content here", string(body))
}

func TestReadFrontMatter_TitleWithColonUnquoted(t *testing.T) {
	tmpDir := t.TempDir()
	testFile := filepath.Join(tmpDir, "test.md")
	content := `---
title: The Search: Finding Meaningful Work
---
# Content here`
	err := os.WriteFile(testFile, []byte(content), 0644)
	require.NoError(t, err)

	_, _, err = readFrontMatter(testFile)
	assert.Error(t, err, "should fail with unquoted colon in title")
	assert.Contains(t, err.Error(), "mapping values are not allowed")
}

func TestReadFrontMatter_TitleWithColonQuoted(t *testing.T) {
	tmpDir := t.TempDir()
	testFile := filepath.Join(tmpDir, "test.md")
	content := `---
title: "The Search: Finding Meaningful Work"
---
# Content here`
	err := os.WriteFile(testFile, []byte(content), 0644)
	require.NoError(t, err)

	body, params, err := readFrontMatter(testFile)
	require.NoError(t, err)
	assert.Equal(t, "The Search: Finding Meaningful Work", params.Title)
	assert.Equal(t, "\n# Content here", string(body))
}

func TestReadFrontMatter_NoFrontMatter(t *testing.T) {
	tmpDir := t.TempDir()
	testFile := filepath.Join(tmpDir, "test.md")
	content := `# Just content, no front matter`
	err := os.WriteFile(testFile, []byte(content), 0644)
	require.NoError(t, err)

	body, params, err := readFrontMatter(testFile)
	require.NoError(t, err)
	assert.Equal(t, "", params.Title)
	assert.Equal(t, content, string(body))
}

func TestReadFrontMatter_EmptyFrontMatter(t *testing.T) {
	tmpDir := t.TempDir()
	testFile := filepath.Join(tmpDir, "test.md")
	content := `---
---
# Content here`
	err := os.WriteFile(testFile, []byte(content), 0644)
	require.NoError(t, err)

	body, params, err := readFrontMatter(testFile)
	require.NoError(t, err)
	assert.Equal(t, "", params.Title)
	assert.Equal(t, "\n# Content here", string(body))
}

func TestReadFrontMatter_MultipleFields(t *testing.T) {
	tmpDir := t.TempDir()
	testFile := filepath.Join(tmpDir, "test.md")
	content := `---
title: "Test Title"
layout: "default"
---
# Content here`
	err := os.WriteFile(testFile, []byte(content), 0644)
	require.NoError(t, err)

	body, params, err := readFrontMatter(testFile)
	require.NoError(t, err)
	assert.Equal(t, "Test Title", params.Title)
	assert.Equal(t, "default", params.Layout)
	assert.Equal(t, "\n# Content here", string(body))
}
