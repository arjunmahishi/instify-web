from django.shortcuts import render
from django.http import JsonResponse
import srmbot

def univNews(req):
	try:
		news = srmbot.getNews()
		data = srmbot.makeData(news)
	except Exception as e:
		return str(e)
	return JsonResponse(data)

def attendance(req):
	return JsonResponse({})

def timeTable(req):
	return JsonResponse({})
