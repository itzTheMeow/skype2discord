const create = (columns, rows) => ({
  columns: Number.parseInt(columns, 10),
  rows: Number.parseInt(rows, 10),
});

module.exports = function terminalSize() {
  const { env, stdout, stderr } = process;

  if (stdout && stdout.columns && stdout.rows) {
    return create(stdout.columns, stdout.rows);
  }

  if (stderr && stderr.columns && stderr.rows) {
    return create(stderr.columns, stderr.rows);
  }

  // These values are static, so not the first choice
  if (env.COLUMNS && env.LINES) {
    return create(env.COLUMNS, env.LINES);
  }

  return create(80, 24);
};
