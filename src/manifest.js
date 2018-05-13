module.exports = {
  "name": "Hacker-Top-News",
  "description" : "Read random top articles of Hacker News",
  "version": "1.0",
  "manifest_version": 2,
  "permissions":["management"],
  "chrome_url_overrides":{
      "newtab":"index.html"
  },
  "sandbox": {
    "pages": ["index.html"]
  },
  "icons":{
      "16":"hn-logo.png",
      "32":"hn-logo.png",
      "48":"hn-logo.png",
      "128":"hn-logo.png"
  }
}
