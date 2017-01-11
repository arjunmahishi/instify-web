from bs4 import BeautifulSoup as bs

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

def getTimeTableData(htmlData):

	timeTableData = {}
	day_no = 0

	soup = bs(htmlData, 'html.parser')
	table = soup.find("table").find_all("tr")

	for row in table[3:]:
		subjectList = []

		day_name = DAYS[day_no]
		day_no += 1
		for hour in row.find_all('td', {'class':'tablecontent02'}):
			## Preparing a list of subjects for the day ##
			subjectList.append(getsubjectString(hour.text.strip().split(',')))

		timeTableData[day_name] = subjectList

	return timeTableData

def getAttendanceData(htmlData):

	subjectWiseData = {}

	soup = bs(htmlData, 'html.parser')
	table = soup.find("table").text.encode('UTF-8').strip().split("\n\n")

	for row in table[3:]:
		## TODO : compress code
		columns = row.strip().split('\n')
		subjectCode = columns[0]
		subjectTitle = columns[1]
		total = columns[-1]
		subjectWiseData[subjectCode.strip()] = (subjectTitle.strip(), float(total.strip()))

	return subjectWiseData

def getsubjectString(subjectList):
	## This function is for handling multiple subject names in one hour/period

	## Removing duplicate elements with swag
	subjectList = list(set([subject.strip() for subject in subjectList]))

	subjectString = ""
	for subject in subjectList:
		subjectString += subject + "/"

	return subjectString.strip('/')
