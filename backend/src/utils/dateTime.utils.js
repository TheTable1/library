function formatDateTime(d) {
  return new Date(d).toLocaleString("th-TH", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

module.exports = { formatDateTime };
