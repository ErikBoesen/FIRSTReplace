console.log('FIRSTREPLACE ACTIVE');

var regex = /[0-9]{2,4}/g;

function getName(num) {
	var req = new XMLHttpRequest();
	req.open('GET', 'https://www.thebluealliance.com/api/v3/team/frc' + num + '/simple', false);
	req.setRequestHeader('X-TBA-Auth-Key', 'Kz3o9D0asfHVbC9Jmlnmx1RFHPaBJlFpixHcTa25tY4RpGdEZ3dbMtvnfW7E5Hxt')
	req.send(null);

	if (req.status === 200)
		return JSON.parse(req.responseText).nickname;
}

// Go through all the elements
var html = document.body.innerHTML;
var m;
while (true) {
	m = regex.exec(html);
	if (m == null) break;
	html = html.replace(m, getName(m));
}
document.body.innerHTML = html;
