// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const asn1 = require("asn1.js")
const rfc = require("asn1.js-rfc5280")
const d = require("./decorator")
const dom = require("./dom")
const fs = require("fs")
const parser = exports;

const subjectMap = {
  "1.3.6.1.4.1.311.60.2.1.3" : "jurisdictionOfIncorporation",
  "2.5.4.15": "businessCategory",
  "2.5.4.5" : "serialNumber",
  "2.5.4.6" : "countryName",
  "2.5.4.8" : "stateOrProvinceName",
  "2.5.4.7" : "localityName",
  "2.5.4.97": "id",
  "2.5.4.10": "organizationName",
  "2.5.4.3" : "commonName"
};

d.decorate(rfc, asn1);

function get(b) {
  return rfc.DirectoryString.decode(b, "der").value;
}

function parseSubject(subject) {
  var obj = {}
  var len = subject.value.length;
  for(var i = 0; i < len; i++) {
    var temp = subject.value[i];
    if(Array.isArray(temp)) {
      temp = temp[0];
    }
    var key = temp.type;
    if(Array.isArray(key)) {
      key = subjectMap[key.join(".")];
    }
    obj[key] = get(temp.value);
  }
  return obj;
}


parser.parse = function(filePath) {
  var pem = fs.readFileSync(filePath, "UTF-8");
	const p = rfc.Certificate.decode(pem, 'pem',{"label": "CERTIFICATE"});
  var subject = parseSubject(p.tbsCertificate.subject);
  var len = p.tbsCertificate.extensions.length;
  for(var i = 0; i < len; i++) {
    var ext = p.tbsCertificate.extensions[i];
      if(Array.isArray(ext.extnID) && ext.extnID.join(".") == "1.3.6.1.5.5.7.1.3") {
        var statments = rfc.QCStatements.decode(ext.extnValue, "der");
        dom.print(subject, statments.qcStatement.info)
        return;
      } 
  }
  console.log("Not an eIDAS?");	
}