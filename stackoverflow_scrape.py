import csv
import time as tm
from selenium import webdriver

driver = webdriver.Chrome('/Users/lisa/Downloads/chromedriver')  # Optional argument, if not specified will search path.
driver.get('https://stackoverflow.com/questions/tagged/r?sort=newest&page=1308&pagesize=50');
#time.sleep(5) # Let the user actually see something!

i = 1308
with open('output.csv', mode='a') as out_file:
	writer = csv.writer(out_file, delimiter=',')
	#header
	#writer.writerow(["Question", "Vote_Count", "View_Count", "Ans_Count", "Tags", "Date_Posted", "Time_Posted", "User", "Reputation"])

	while i <= 1999: 
		tm.sleep(5)
		search_box = driver.find_element_by_id('questions')

		questions = search_box.find_elements_by_class_name("question-summary")
		for q in questions:
			check = True
			vote_count = q.find_element_by_class_name('vote-count-post ').text
			view_count = q.find_element_by_class_name('views ').get_attribute("title").split(" ")[0]
			ans_count = q.find_element_by_xpath("./div[1]/div[1]/div[2]/strong").text

			question = q.find_element_by_xpath("./div[2]/h3/a").text

			tag_list = []
			tags = q.find_elements_by_xpath("./div[2]/div[2]/*")
			for tag in tags:
				t = tag.text
				if t != "r" :
					tag_list.append(t)
			
			try:
				time = q.find_element_by_xpath("./div[2]//div[@class='user-action-time']/span").get_attribute("title").split(" ")
				date_posted = time[0]
				time_posted = time[1]
			except:
				check = False
			if check:
				try:
					user = q.find_element_by_xpath('.//div[@class="user-details"]/a').text 
				except:
					user = "NA"
				try:
					rep_score = q.find_element_by_xpath('.//div[@class="user-details"]//span[@class="reputation-score"]').text
				except:
					rep_score = 0

				writer.writerow([question, vote_count, view_count, ans_count, tag_list, date_posted, time_posted, user, rep_score])
				#print(question, vote_count, view_count, ans_count, tag_list, date_posted, time_posted, user, rep_score, sep=",")

		driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
		next_page = driver.find_elements_by_xpath('//*[@id="mainbar"]/div[6]/a')
		nxt = next_page[-1]

		#print(nxt.get_attribute("title"))
		nxt.click()
		i += 1

driver.quit()