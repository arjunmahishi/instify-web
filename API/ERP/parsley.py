from bs4 import BeautifulSoup as bs
import datetime

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

def getTimeTableData(htmlData):
	"Takes in html data and returns a dictionary"

	timeTableData = {}
	day_no = 0

	soup = bs(htmlData, 'html.parser')
	table = soup.find("table").find_all("tr")

	subjectDict = getSubjectNameDict(soup)

	for row in table[3:]:
		subjectList = []

		day_name = DAYS[day_no]
		day_no += 1
		for hour in row.find_all('td', {'class':'tablecontent02'}):
			## Preparing a list of subjects for the day ##
			subjectList.append(getsubjectString(hour.text.strip().split(','), subjectDict))

		timeTableData[day_name] = subjectList

	return {getCurrentDay() : timeTableData[getCurrentDay()]}

def getAttendanceData(htmlData):
	"Takes in html data and returns a dictionary"

	subjectWiseData = {}

	soup = bs(htmlData, 'html.parser')
	table = soup.find("table").text.encode('UTF-8').strip().split("\n\n")

	for row in table[3:]:
		columns = row.strip().split('\n')
		subjectCode = columns[0]
		subjectTitle = columns[1]
		total = columns[-1]
		subjectWiseData[subjectCode.strip()] = (subjectTitle.strip(), float(total.strip()))

	return subjectWiseData

def getsubjectString(subjectList, subjectDict):
	## This function is for handling multiple subject names in one hour/period

	## Removing duplicate elements with swag
	subjectList = list(set([subject.strip() for subject in subjectList]))

	subjectString = ""
	for subject in subjectList:
		if subject != "-":
			subjectString += subjectDict[subject] + " / "

	if subjectString.strip(' / ') == "":
		return "NO DATA"

	return subjectString.strip(' / ')

def getSubjectNameDict(soup):
	"Takes a soup object and returns a dictionary"

	subjectNames = {}

	table = soup.find_all("table")[1].find_all("tr")
	for row in table[2:]:
		columns = row.find_all("td")

		subjectCode = columns[0].text.strip()
		subjectName = columns[1].text.strip()

		subjectNames[subjectCode] = subjectName

	return subjectNames

def getCurrentDay():
	return datetime.datetime.now().strftime("%A")
