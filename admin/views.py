from django.shortcuts import render

def landing(requests):

	context = {
		"title" : "Instify-Admin",
	}

	return render(requests, "landing.html", context)