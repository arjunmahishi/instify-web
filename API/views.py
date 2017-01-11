from django.shortcuts import render
from django.http import JsonResponse
import srmbot
from ERP.erp import getTimeTable, getAttendance

ERROR_MSG = {
	"ERROR" : "Something is wrong with the way you are accessing the API."
}

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
		return JsonResponse(getAttendance(regno, password))

	return JsonResponse(ERROR_MSG)

def timeTable(req):
	get = req.GET or None

	if get and "regno" in get.keys() and "password" in get.keys():
		regno = get["regno"]
		password = get["password"]
		return JsonResponse(getTimeTable(regno, password))

	return JsonResponse(ERROR_MSG) 
