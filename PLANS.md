Cb_Site Plans
=============

Goal
----
A lightweight CMS specially constructed to handle Cb's needs, and expanded when necessary. Much of the structural ideas here are based on WordPress and Pods for WordPress.


Functional Needs
----------------
* new		- make new things
* edit		- edit existing things
* upload	- upload media
* delete	- delete anything by id


Taxonomies
----------
Numerous "taxonomies" or "post-types" will be needed to display the appropriate template for given content. Currently those taxonomies are:

	software	- publicly released software
		history	- version history
	news		- announcements and news relevant to Cb
	blog		- anything, really
		category- content sorting category
	status		- updates forwarded to Twitter, attributed to the author (130 chars.)
	press		- links to any articles, mentions, interviews related to Cb
	experiment	- reports for scientific experiments conducted by Cb
	page		- page on the site, including archive pages for other taxonomies
	media		- sub-tax common to software, news, blog, experiment, and page
	user		- user profile

Each of these taxonomies has its own set of necessary and optional values. The one common value is the id. Following is a break down of the taxonomies and their values. Value are considered necessary unless marked otherwise:

* u - represents a unique value
* a - represents an automatically filled value
* o - represents an optional value
* b - represents a boolean value
* s - represents a sub-taxonomy

###software
		id		- a u
		media	- a s o - a list of media connected to this post
		slug	- a - url friendly version of title
		title	-
		content	- description of the software
		version	-
		history	- s - version change history
		license	- o - license under which the software is released and optional url separated by a comma
		repo	- o - url of the software's repository
		price	- o - USD value for the software
		buy		- o - url to the download or purchase page (Google Play, App Store, etc.)
		icon	- o - a 512 x 512 image .png or .svg

###history
			id		- a u
			version	- u - the version the description belongs to
			content - list of changes made, separated by asterisks

###news
		id		- a u
		date	- a
		media	- a s o - csv of media connected to this post
		slug	- a - url friendly version of title
		title	-
		content	-
		publish	- b - false is a draft, true is publicly visible

###blog
		id		- a u
		date	- a
		author	- a
		media	- a s o - csv of media connected to this post
		slug	- a - url friendly version of title
		title	-
		content	-
		category- s o - csv of categories for sorting blog content
		publish	- b - false is a draft, true is publicly visible

###category
			id		- a u
			slug	- a - url friendly version of title
			title	-
			content - o - a description of content fitting this category
			link	- a - csv of blog posts in this category

###status
		id		- a u
		date	- a
		author	- a
		content	- restricted to 130 characters

###press
		id		- a u
		date	- a
		slug	- a - url friendly version of title
		title	- title of the article
		content	- o - announcement blurb for the news section post
		url		- relevant url
		journal	- the name of the company publishing the article
		category- s - mention, article, interview, audio, video

###experiment
		id		- a u
		date	- a
		media	- a s o - csv of media connected to this post
		author	- a - additional authors may be added
		slug	- a - url friendly version of title
		title	- 

###page
		id		- a u
		media	- a s o - csv of media connected to this post
		slug	- a - url friendly version of title
		title	-
		content	- o -
		archive	- o - title of taxonomy this page will be used as an archive for

###media
		id		- a u
		type	- a - MIME type
		url		- a - url to the media
		title	- o -
		content	- o - description or caption for the media

###user
		id		- a u
		slug	- a - url friendly version of nickname
		email	- u - user's e-mail address, used as username
		password- hashed password
		nickname- whatever the user wants to call themself
		role	- partner, mod, user
		content	- o - short bio of the user
		url		- o - url to user's site
		twitter	- o - twitter username (perhaps verify upon submission)
		plus	- o - google plus id

Possibilities for later taxonomies:

	comment		- sub-tax common to news, blog, experiment, post, ticket, and for_post
	restrict	- sub-tax for role mod, restricting role powers to certain taxonomies
	forum		- can contain other forums, as well as posts
		for_post- forum post
	ticket		- issue-tracking ticket
	project		- project management


Templating and Template Tags
----------------------------
Templates are applied using a specific to generic naming hierarchy, looking for [slug].html before [taxonomy].html. For example, if we have a page with the slug "about", the template system first looks for "about.html". If that's not found, it looks for "page.html".

Template tags are used to display information contained in the post objects. For example, the title of a news post, for which the tag might look like:

	<#title>

Template tags will also be used to call sub-taxonomy lists or archives into the template, as well as define an optional template to use to display those sub-taxonomies. For example, on a software page there'll be a history sub-tax. A template tag for this might look like:

	<#tax="history">
	
This would display all the history posts associated with this post and display them using the history template.	If we'd like to list the five latest news posts with a special template, the template tag might look like:

	<#tax="news" limit="5" template="front-news">


Alternate posting systems
-------------------------
The primary method of posting content to the site will be through the site's admin panel. For simpler posts, namely status posts and perhaps blog posts, a few faster methods may be appropriate.

###Posting inline
Posting directly on the site, if logged in. A link would be made available somewhere near the latest posts allowing you to immediately add and publish a post to the site.

###Command line
posting from the command line, using a simple command. Status posts would be one line with only one value to fill, e.g.:

	cb new status "I'm making up a whole new CMS RIGHT NOW!"

Blog posts would be a bit more complicated, e.g.:

	cb new blog title="This is the Title", content="This is a blog post. It's not too long, nor very complicated, but it's more elaborate than status update, and likely more valuable information-wise."


