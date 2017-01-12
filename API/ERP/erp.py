import requests
import parsley
URL_MAIN = "http://evarsity.srmuniv.ac.in/srmswi/usermanager/youLogin.jsp"
URL_ATTENDANCE = "http://evarsity.srmuniv.ac.in/srmswi/resource/StudentDetailsResources.jsp?resourceid=7"
URL_TIMETABLE = "http://evarsity.srmuniv.ac.in/srmswi/resource/StudentDetailsResources.jsp?resourceid=5"

def getHtml(url, username, password):

	## POST payload and header ##
	string = "txtSN=%s&txtPD=%s&txtPA=1" % (username, password)
	header = {'content-type': 'application/x-www-form-urlencoded'}

	session = requests.session()  # To maintain auth cookies

	session.post(URL_MAIN, data=string, headers=header)  # Login first
	req = session.post(url)  # get attendance

	return req.text

def getTimeTable(username, password):
	return parsley.getTimeTableData(getHtml(URL_TIMETABLE, username, password))

def getAttendance(username, password):
	return parsley.getAttendanceData(getHtml(URL_ATTENDANCE, username, password))

if __name__ == "__main__":
	import sys

	if len(sys.argv) >= 3:
		username = sys.argv[1]
		password = sys.argv[2]

		timeTable = getTimeTable(getHtml(URL_TIMETABLE, username, password))
		attendance = getAttendance(getHtml(URL_ATTENDANCE, username, password))

		print "Time Table : \n"
		print timeTable

		print "Attendance : \n"
		print attendance