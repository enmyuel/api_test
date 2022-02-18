from pymongo import MongoClient
from pymongo.cursor import CursorType

# const arrTime7 = new Date(2022, 1, 7, 11, 00, 0)
# const depTime7 = new Date(2022, 1, 7, 11, 10, 30)

uri = "##"

client = MongoClient(uri)
db = client.parkdb
collection = db['park']
cursor = collection.find({})

# 도큐먼트 출력
for document in cursor:
    print(document)

