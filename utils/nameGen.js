function mainNameGen(sName){
	let dt = new Date();
	let nameRegx = /\s+/g;
	let name = dt.getTime()+'_'+sName.replace(nameRegx,'_');

	return name;
}

module.exports = mainNameGen