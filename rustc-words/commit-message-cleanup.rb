
def to_freq(path)
  commits = File.read(path).split(/\0/)

  clean_commits = commits.map do |c|
    c.downcase
      .gsub(/^auto merge of .*/, '')
      .gsub(/^rollup of .*$/, '')
      .gsub(/^rollup merge of .*$/, '')
      .gsub(%r{https://github.com/rust-lang/rust/issues/\d+}, '')
      .gsub(%r{https://github.com/rust-lang/rust/pull/\d+}, '')
  end

  result = {}

  clean_commits.map do |c|
    words = c.split(/[^a-z0-9-]/)

    freq = {}
    words.each do |w|
      freq[w] = 1
    end

    freq
  end.each do |freq|
    freq.each do |k, v|
      result[k] ||= 0
      result[k] += 1
    end
  end

  result
end

print "word,freq\n"
to_freq(ARGV.shift).each do |w, freq|
  print w, ',', freq, "\n"
end
