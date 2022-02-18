from pymongo import MongoClient
from pymongo.cursor import CursorType
from datetime import datetime
import random

# 2022-02-07T11:10:30.000Z

uri = "#"
client = MongoClient(uri)
db = client.parkdb
collection = db['park']

n = 10

# 숫자3+단어+숫자4 형식의 번호판 생성
word = ['가', '나', '다', '라', '마', '바', '사']
bunho = []
for i in range(n):
    x = random.randint(100, 999)
    w = random.randint(0, len(word)-1)
    y = random.randint(1000, 9999)
    bunho.append(str(x)+word[w]+str(y))

# 입차시간 및 출차시간 생성
timelist=[]
year = "2022"
month = "02"
day = "18"
hour = str(random.randint(10, 17))
minute = str(random.randint(10, 59))
second = str(random.randint(10, 59))

for i in range(n):
    t1 = t2 = 0
    while (1):
        t1_hour = str(random.randint(10, 17))
        t1_minute = str(random.randint(10, 59))
        t1_second = str(random.randint(10, 59))

        t2_hour = str(random.randint(10, 17))
        t2_minute = str(random.randint(10, 59))
        t2_second = str(random.randint(10, 59))

        if int(t1_hour+t1_minute+t1_second) < int(t2_hour+t2_minute+t2_second):
            break

    t1 = "2022-02-07T"+t1_hour+":"+t1_minute+":"+t1_second+".000Z"
    t2 = "2022-02-07T"+t2_hour+":"+t2_minute+":"+t2_second+".000Z"
    
    # 번호판 및 입출차시간 DB에 저장
    data = {
        "id": bunho[i],
        "arrTime" : t1,
        "depTime" : t2
    }

    rec_data = collection.insert_one(data)


# 도큐먼트 출력
# for document in cursor:
#     print(document)
 
