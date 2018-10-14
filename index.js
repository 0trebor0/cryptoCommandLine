const fs = require('fs'),
crypto = require('crypto'),
chalk = require('chalk');
//node index encrypt key filename
//node index decrypt key filename

let arg = process.argv.slice(2);

if( !fs.existsSync(__dirname+'/temp') ){
	fs.mkdirSync( __dirname+'/temp' );
	console.log(chalk.red("ERROR: creating /temp"));
	process.exit();
}

encryptFile = ( key, filename, filelocation )=>{
	let cipher = crypto.createCipher('aes-256-cbc',key);
	let input = fs.createReadStream(filelocation);
	let output = fs.createWriteStream(__dirname+'/temp/'+filename);

	input.pipe(cipher).pipe(output);
	output.on('finish', ()=>{
		console.log(chalk.green("File"+filename+" encrypted"));
	});
	input.on('error', (error)=>{
		console.log(chalk.red("ERROR: "+error));
	});
	output.on('error', (error)=>{
		console.log(chalk.red("ERROR: "+error));
	});
	
}
decryptFile = ( key, filename, filelocation )=>{
	let cipher = crypto.createDecipher('aes-256-cbc',key);
	let input = fs.createReadStream(filelocation);
	let output = fs.createWriteStream(__dirname+'/temp/'+filename);

	input.pipe(cipher).pipe(output);
	output.on('finish', ()=>{
		console.log(chalk.green("File"+filename+" decrypted"));
	});
	input.on('error', (error)=>{
		console.log(chalk.red("ERROR: "+error));
	});
	output.on('error', (error)=>{
		console.log(chalk.red("ERROR: "+error));
	});
	
}

if( arg[0] == 'encrypt' ){
	if( fs.existsSync(arg[3]) ){
		encryptFile( arg[1].toString('hex'), arg[2], arg[3] );
	}else{
		console.log(chalk.red("ERROR: file not found"));	
	}
}else if( arg[0] == 'decrypt' ){
	if( fs.existsSync(arg[3]) ){
		decryptFile( arg[1].toString('hex'), arg[2], arg[3] );
	}else{
		console.log(chalk.red("ERROR: file not found"));	
	}
}else{
	console.log(chalk.red("ERROR: invalid command\r\nENCRYPT: node index encrypt key filename filelocation\r\nDECRYPT: node index decrypt key filename filelocation\n\rEXAMPLE:\r\nEXAMPLE: node index encrypt trebor test.txt /home/debian/Documents/test.txt\r\nEXAMPLE: node index decrypt trebor test.txt /home/debian/Documents/test.txt"));
}
