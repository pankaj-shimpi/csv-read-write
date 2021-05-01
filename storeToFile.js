const fs = require('fs')
const path = require('path')
const json2csv = require('json2csv').parse;
const csv2json = require("csvtojson");

const mapData = (data = []) => {
  return data.map(item => { 
    return {
      createdAt: item.createdAt,
      customerId: item.customerId,
      invoiceId: item.invoiceId,
    }
  });
}

const storeToFile = (_data) => {

  const fields = ['createdAt', 'customerId', 'invoiceId'];
  const filename = path.join(__dirname, `data.csv`);
  const opts = { fields };
  const data = mapData(_data);
    let rows;

    if (!fs.existsSync(filename)) {
        rows = json2csv(data, opts);
    } else {
        rows = json2csv(data, { header: false });
    }
    
    fs.appendFileSync(filename, rows);
    fs.appendFileSync(filename, "\r\n");
    return;
};

const downloadFile = () => {
  const filename = path.join(__dirname, `data.csv`);
  const fileData = fs.readFileSync(filename, 'utf8');
  const dataInString = fileData.toString();
  return dataInString;
}

module.exports = {
  storeToFile,
  downloadFile,
}
