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
	var html = (post.index+1) + " of " + (riotPosts.length) + " Riot Posts ";
	var prev = getRiotPost(post.index - 1), next = getRiotPost(post.index + 1);
	if(prev != null) {
		//has a previous post
		html = html + "<a href='#"+prev.id+"'>&#8249;</a>";
	}
	html = html + "<span class='flair flair-riot'></span>";
	if(next != null) {
		//has a next post
		html = html + "<a href='#"+next.id+"'>&#8250;</a>";
	}
	taglineSpan.innerHTML = html;
	return taglineSpan;
}

var riotPosts = document.body.querySelectorAll('.noncollapsed .flair-riot');
if(riotPosts.length > 0) {
	//there are riot posts
	for(var i = 0; i < riotPosts.length; i++) {
		var post = getRiotPost(i);
		if(post != null) {
			if(i === 0) {
				var commentsArea = document.body.querySelector('.nestedlisting');
				var firstPostDiv = document.createElement("div");
				firstPostDiv.style.textAlign = "right";
				firstPostDiv.innerHTML  = "First Riot Post <a href='#"+post.id+"'><span class='flair flair-riot'></span></a>";
				commentsArea.insertBefore(firstPostDiv, commentsArea.firstChild);
			}
			post.tagline.appendChild(buildNavigationSpan(post));
		}
	}
	
}
