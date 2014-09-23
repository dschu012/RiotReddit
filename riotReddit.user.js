// ==UserScript==
// @name        Riot Reddit
// @namespace   https://github.com/dschu012/RiotReddit
// @description Navigate comments left by Rioter's on /r/leagueoflegends much like the system used on Riot's forums
// @include     http://reddit.com/r/leagueoflegends/*
// @include     https://reddit.com/r/leagueoflegends/*
// @include     http://*.reddit.com/r/leagueoflegends/*
// @include     https://*.reddit.com/r/leagueoflegends/*
// @version     1
// @grant       none
// ==/UserScript==

function getRiotPost(i) {
	if(i < 0 || i > riotPosts.length - 1)
		return null;
	return {
		index: i,
		comment: riotPosts[i].parentElement.parentElement.parentElement,
		tagline: riotPosts[i].parentElement.parentElement.querySelector('.tagline'),
		id: riotPosts[i].parentElement.parentElement.parentElement.querySelector('.parent a').name
	};
}

function buildNavigationSpan(post) {
	var taglineSpan = document.createElement("span");
	taglineSpan.style.cssFloat = "right";
	var html = (post.index+1) + " of " + (riotPosts.length) + " Riot Comments ";
	var prev = getRiotPost(post.index - 1), next = getRiotPost(post.index + 1);
	if(prev != null) {
		//has a previous post
		html = html + "<a href='#"+prev.id+"'> &#8249; </a>";
	}
	html = html + "<span class='flair flair-riot'></span>";
	if(next != null) {
		//has a next post
		html = html + "<a href='#"+next.id+"'> &#8250; </a>";
	}
	taglineSpan.innerHTML = html;
	return taglineSpan;
}

var riotPosts = document.body.querySelectorAll('.noncollapsed .flair-riot');
var commentsArea = document.body.querySelector('.nestedlisting');
var firstPostDiv = document.createElement("div");
firstPostDiv.style.textAlign = "right";
firstPostDiv.style.padding = "10px 5px";
if(riotPosts.length > 0) {
	//there are riot posts
	for(var i = 0; i < riotPosts.length; i++) {
		var post = getRiotPost(i);
		if(post != null) {
			if(i === 0) {
				
				firstPostDiv.innerHTML  = "First Riot Comment <a href='#"+post.id+"'><span class='flair flair-riot'></span></a>";
				
			}
			post.tagline.appendChild(buildNavigationSpan(post));
		}
	}	
} else {
	firstPostDiv.innerHTML  = "No Riot Comments <span class='flair flair-riot'></span>";
}
commentsArea.insertBefore(firstPostDiv, commentsArea.firstChild);