// Author: Shane Reustle <me@shanereustle.com>
// Source: http://github.com/reustle/hashrouter

var hashrouter = function(callback, overrideConfig){
	// Every time the hash changes, pass the latest url to callback as an array
	
	var overrideConfig = overrideConfig || {};
	
	// How often should we check the hash (in ms)
	var hashCheckInterval = overrideConfig.checkHashInterval || 100;
	var routeOnInit = overrideConfig.routeOnInit || true;
	
	// Grabs the hash and returns it as an array
	var getFriendlyUrlHash = function(){
		var hashRe = new RegExp('^#/(.*?)/?$');
		var rawHash = window.location.hash;
		if(rawHash.length != 0){
			var reMatch = rawHash.match(hashRe);
			if(reMatch != null && reMatch.length > 1){
				return reMatch[1];
			}
		}
		return '';
	};
	
	var prevHash;
	if(routeOnInit){
		// Don't store a hash so the callback is triggered right away
		prevHash = false;
	}else{
		// Store the existing hash as the starting point
		prevHash = getFriendlyUrlHash();
	}
	
	// Checks to see if the hash has changed
	var checkHash = function(){
		var currentHash = getFriendlyUrlHash();
		if(currentHash !== prevHash){
			prevHash = currentHash;
			
			var hashArray;
			if(currentHash == ''){
				hashArray = [];
			}else{
				hashArray = currentHash.split('/');
			}
			
			callback(hashArray);
		}
	};
	
	// Check the hash every X ms
	setInterval(checkHash, hashCheckInterval);
	
};

