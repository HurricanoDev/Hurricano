const fetch = require("node-fetch");
const create = (bins, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!bins || !Array.isArray(bins))
      return reject(new TypeError("Invalid bins array provided."));
    if (bins.length == 0) return reject(new SyntaxError("No bins provided."));

    let parsedBins = [];

    for (var x = 0; x < bins.length; x++) {
      let bin = bins[x];

      if (typeof bin !== "object")
        return reject(new TypeError("Invalid bin provided."));
      if (!bin.content || typeof bin.content !== "string")
        return reject(new TypeError("Invalid bin content provided."));

      let parsedBin = { content: bin.content, languageId: bin.languageId };
      if (bin.name) parsedBin.name = bin.name;

      parsedBins.push(parsedBin);
    }

    const binObject = { files: parsedBins };

    if (options.title) binObject.title = options.title;
    if (options.description) binObject.description = options.description;

    fetch("https://sourceb.in/api/bins/", {
      method: "POST",
      body: JSON.stringify(binObject),
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Sourcebin Post, By https://github.com/HurricanoBot/Hurricano",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          reject(res.statusText);
        }
      })
      .then((res) => res.json())
      .then((res) => {
        let cont = 0;

        let parsedFiles = parsedBins.map((f) => {
          cont++;

          return {
            raw: `https://sourceb.in/raw/${res.key}/${cont - 1}`,
            name: f.name,
            content: f.content,
            languageId: f.languageId,
            language: linguist[f.languageId],
          };
        });

        resolve({
          key: res.key,
          url: `https://sourceb.in/${res.key}`,
          title: options.title,
          description: options.description,
          created: new Date(),
          files: parsedFiles,
        });
      });
  });
};
module.exports = create;
