// Make an array of all the elements on the page.
var elements = document.getElementsByTagName('*');

// Go through all the elements
for (i = 0; i < elements.length; i++) {
	var element = elements[i];

    // Go through all the child elements of each element.
	for (j = 0; j < element.childNodes.length; j++) {
		var node = element.childNodes[j];

		if (node.nodeType === 3) {
            var found = [];
			var text = node.nodeValue;
			for (k = 7000; k > 0; k--) {
                if (text.search(String(k)) != -1) {
                    found += k;
                }
            }
            var foundNames = [];
            if (found.length > 0) {
                for (k = 0; k < found.length; k++) {
                    var apiReq = new XMLHttpRequest();
        			apiReq.open('GET', 'http://www.thebluealliance.com/api/v2/team/frc' + k + '?X-TBA-App-Id=erikboesen:firstreplace:v1.0', false);
        			apiReq.onreadystatechange = function() {
                        var obj = JSON.parse(apiReq.responseText);
                        if (obj.length > 1) {
                            foundNames += obj.nickname;
                        } else {
                            foundNames += found[i];
                        }
                    };
        			apiReq.send(null);
                }
            }
            for (k = 0; k < foundNames.length; k++) {
                console.log('Replacing ' + found[i] + ' with ' + foundNames[i]);
                var replacedText = text.replace(new RegExp(found[i], 'gi'), foundNames[i]);
            }

			if (replacedText !== text) {
				element.replaceChild(document.createTextNode(replacedText), node);
			}
		}
	}
}