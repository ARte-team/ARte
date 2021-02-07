import boto3
import re

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

def isInt(x):
    return isinstance(x, int)

def isFloat(x):
    return isinstance(x, float)

def isArray(x):
    return isinstance(x, list)

pattern = re.compile("^(0[1-9]|[12][0-9]|3[01])/" + \
					 "(0[1-9]|1[012])/" + \
					 "20[2-9][0-9] ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$")

def checkDatetime(x):
    return True if pattern.match(x) else False


def lambda_handler(event, context):
        #print(event)

        res = {
            "HTTPStatusCode": 400,
            "errorType":      "Bad Request"
        }

        # Validate input data
        roomID        = event["roomID"]
        datetime      = event["datetime"]
        peopleCurrent = event["peopleCurrent"]
        peopleTotal   = event["peopleTotal"]

        if not isInt(roomID):
            print("roomID NO OK")
            return res

        if not checkDatetime(datetime):
            print("datetime NO OK")
            return res

        if not isInt(peopleCurrent):
            print("peopleCurrent NO OK")
            return res

        if not isInt(peopleTotal):
            print("peopleTotal NO OK")
            return res

        # The message is OK

        # Check if the message is from the board at the entrance
        if (roomID == 0):
            table = dynamodb.Table('ARte_DailyStats')

            # Create an object with the current time HH:mm:SS and the corresponding number of people in the museum
            obj = { "time": datetime[11:], "people": peopleCurrent }

            res = table.update_item(
                Key={
                    "datetime": datetime[0:10] # DD/MM/YYYY
                },
                UpdateExpression="set timesAndPeople = list_append(if_not_exists(timesAndPeople, :empty_list), :o), peopleTotal = :pt",
                ExpressionAttributeValues={
                    ":o":   [obj],
                    ":pt":  peopleTotal,
                    ":empty_list": []
                },
                ReturnValues="UPDATED_NEW"
            );

        # Else the message is from a board located in a room
        else:
            # Validate remaining input data
            crowding       = event["crowding"]
            infraredValues = event["infraredValues"]

            if not isFloat(crowding):
                print("crowding NO OK")
                return res

            if not isArray(infraredValues):
                print("infraredValues NO OK")
                return res
            else:
                for i in range(len(infraredValues)):
                    if not isFloat(infraredValues[i]):
                        print("infraredValues NO OK")
                        return res
                    else:
                        # Convert float values into strings to be accepted by DynamoDB
                        infraredValues[i] = str(infraredValues[i])

            # Message is OK

            table = dynamodb.Table('ARte_Rooms')

            res = table.update_item(
                Key={
                    "roomID": roomID
                },
                UpdateExpression="set #dt = :d, peopleCurrent = :pc, peopleTotal = :pt, crowding = :c, infraredValues = :i",
                ExpressionAttributeNames={
                    "#dt": datetime
                },
                ExpressionAttributeValues={
                    ":d":  datetime,
                    ":pc": peopleCurrent,
                    ":pt": peopleTotal,
                    ":c":  str(crowding), # Float values are not ok for DynamoDB
                    ":i":  infraredValues
                },
                ReturnValues="UPDATED_NEW"
            );

        return res
