from django.shortcuts import render
from django.http import JsonResponse
import srmbot
from ERP.erp import getTimeTable, getAttendance

ERROR_MSG_1 = {
	"ERROR_CODE" : 100,
	"ERROR_MSG" : "The URL parameters REGNO and PASSWORD need to be there"
}

ERROR_MSG_2 = {
	"ERROR_CODE" : 101,
	"ERROR_MSG" : "The user credentials you provided may be wrong"
}


def base(req):
	return JsonResponse({
		"API_STATUS" : "Working",
		"End-points" : [
			"/university-news/",
			"/attendance/?regno=&password=",
			"/time-table/?regno=&password=",
		]
	})

def univNews(req):
	try:
		news = srmbot.getNews()
		data = srmbot.makeData(news)
	except Exception as e:
		return str(e)

	return JsonResponse(data)

def attendance(req):
	get = req.GET or None

	if get and "regno" in get.keys() and "password" in get.keys():
		regno = get["regno"]
		password = get["password"]
		try:
			return JsonResponse(getAttendance(regno, password))
		except AttributeError:
			return JsonResponse(ERROR_MSG_2)

	return JsonResponse(ERROR_MSG_1)

def timeTable(req):
	get = req.GET or None

	if get and "regno" in get.keys() and "password" in get.keys():
		regno = get["regno"]
		password = get["password"]
		try:
			return JsonResponse(getTimeTable(regno, password))
		except AttributeError:
			return JsonResponse(ERROR_MSG_2)

	return JsonResponse(ERROR_MSG_1)
