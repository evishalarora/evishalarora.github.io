const dom = exports;


dom._create_row = function(key, value) {
	console.log("| " + key.padEnd(25, " ") + "| " + value.padEnd(50, " ") + "|");	
}

dom._concat_roles = function(roles) {
	var r = new Array;
	for(var i = 0; i < roles.length; i++) {
		r[i] = roles[i].name.value;
	}
	return r.join(", ");
}

dom.print = function(subject, qcStatement) {
	console.log("".padEnd(80, " "))
	console.log("".padEnd(80, "-"))
	this._create_row("Org Id", subject.id);
	this._create_row("Organization Name", subject.organizationName);
	this._create_row("Jurisdiction", subject.jurisdictionOfIncorporation);
	this._create_row("Business Category", subject.businessCategory);
	this._create_row("Serial Number", subject.serialNumber);
	this._create_row("Authority ID", qcStatement.authorityId.value);
	this._create_row("Authority Name", qcStatement.authorityName.value);
	this._create_row("PSD2 Roles", this._concat_roles(qcStatement.roles));
	console.log("".padEnd(80, "-"))
	console.log("".padEnd(80, " "))
}