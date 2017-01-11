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
	return JsonResponse(getAttendance("ra1511008020111", ""))

def timeTable(req):
	return JsonResponse(getTimeTable("ra1511008020111", ""))
