from django.shortcuts import render

def landing(req):
	context = {
		'title' : "Instify-Admin",
	}

	return render(req, "landing.html", context)