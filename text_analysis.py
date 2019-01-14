#Text Analysis of StackOverflow question
import csv
x = []
ans = []
years = []
dup_count = 0
dup =[]
r =0
with open("Clean_data.csv", "r") as infile:
	reader = csv.reader(infile)
	header = next(reader)
	for row in reader:
		r = r+1
	#length of questions
		q_len = len(row[0].split(" "))
		x.append(q_len)
		ans.append(row[3])
		year = row[5].strip()
		year = year.split("/")
		years.append(year[2])
		print year[2]
		if '[duplicate]' in row[0] :
			dup_count +=1
			dup.append("Duplicate")
		else :
			dup.append("Original")


print len(x)
print len(ans)
print len(years)
print len(dup)
print dup
outfile5 = open("text.csv","w")
writer5 = csv.writer(outfile5, delimiter=",")
writer5.writerow(["Length", "Answer" ,"Year", "Dup"])
for i in range(len(x)) :
	
    writer5.writerow([x[i] , ans[i] , years[i] , dup[i]])

print dup_count
print r

