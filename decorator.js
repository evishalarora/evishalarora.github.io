const p = exports;
p.decorate = function(rfc, asn1) {
	const QCStatements = asn1.define('QCStatements', function() {
	  this.seq().obj(
	    this.key("1").any(),
	    this.key("2").any(),
	    this.key("3").any(),
	    this.key("4").any(),
	    this.key("qcStatement").use(QCStatement)
	  );
	});
	rfc.QCStatements = QCStatements;


	const QCStatement = asn1.define('QCStatement', function() {
	  this.seq().obj(
	    this.key("oid").objid(),
	    this.key("info").use(QCStatementInfo)
	  );
	});
	rfc.QCStatement = QCStatement;


	const QCStatementInfo = asn1.define('QCStatementInfo', function() {
	  this.seq().obj(
	    this.key("roles").seqof(QCRole),
	    this.key("authorityName").use(DirectoryString),
	    this.key("authorityId").use(DirectoryString)
	  );
	});
	rfc.QCStatementInfo = QCStatementInfo;



	const QCRole = asn1.define('QCRole', function() {
	  this.seq().obj(
	    this.key("id").objid(),
	    this.key("name").use(DirectoryString)
	  );
	});
	rfc.QCRole = QCRole;

	const DirectoryString = asn1.define('DirectoryString', function() {
	  this.choice({
	    teletexString: this.t61str(),
	    printableString: this.printstr(),
	    universalString: this.unistr(),
	    utf8String: this.utf8str(),
	    bmpString: this.bmpstr()
	  });
	});
	rfc.DirectoryString = DirectoryString;
}