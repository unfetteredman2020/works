
const fs = require('fs')
const path = require('path')
const saveTemplate = async (path, template) => {
  let url = path.join(__dirname, '../../public/'+path)
  await fs.writeFileSync(url, template);
}