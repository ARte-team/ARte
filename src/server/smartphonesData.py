import boto3
import botocore
import re

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('ARte_Artworks')

def isInt(x):
    return isinstance(x, int)

def isBool(x):
    return isinstance(x, bool)

patternUUID = re.compile("^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$")

def checkUUID(x):
    return True if patternUUID.match(x) else False


patternFeature = re.compile("^[A-Za-z]+$")

def checkFeature(x):
    return True if patternFeature.match(x) and len(x) <= 20 else False


'''def lambda_handler(event, context):
        print(event)

        res = table.update_item(
            Key={
                "artworkID": event["artworkID"]
            },
            UpdateExpression="set #v = if_not_exists(#v, :zero) + :one, viewTime = if_not_exists(viewTime, :zero) + :u",
            ExpressionAttributeNames={
                "#v" : "views"
            },
            ExpressionAttributeValues={
                ":zero": 0,
                ":one":  1,
                ":u":    event["usageTime"]
            },
            ReturnValues="UPDATED_NEW"
        );

        return res'''



def lambda_handler(event, context):
        #print("event: ", event)

        res = {
            "HTTPStatusCode": 400,
            "errorType":      "Bad Request"
        }

        # Validate input data
        deviceID    = event["deviceID"]
        #datetime    = event["datetime"]
        feature     = event["feature"]
        artworkID   = event["artworkID"]
        usageTime   = event["usageTime"]
        newView     = event["newView"]

        if not checkUUID(deviceID):
            print("deviceID NO OK")
            return res

        '''if not checkDatetime(datetime):
            print("datetime NO OK")
            return res'''

        if not checkFeature(feature):
            print("feature NO OK")
            return res

        if not checkUUID(artworkID):
            print("artworkID NO OK")
            return res

        if not isInt(usageTime):
            print("usageTime NO OK")
            return res

        if not isBool(newView):
            print("newView NO OK")
            return res

        # The message is OK

        res = None

        # Update event if this is the first time the artwork receives data from smartphones
        try:
            res = table.update_item(
                Key={
                    "artworkID": event["artworkID"]
                },
                UpdateExpression="set #fs = :obj",
                ExpressionAttributeNames={
                    "#fs": "featuresStats"
                },
                ExpressionAttributeValues={
                    ":obj":  { "views": 1, "viewTime": event["usageTime"], event["feature"]: {"views": 1, "viewTime": event["usageTime"]} }
                },
                ConditionExpression="attribute_not_exists(#fs)",
                ReturnValues="UPDATED_NEW"
            );
        except botocore.exceptions.ClientError as e:
            # Ignore the ConditionalCheckFailedException, bubble up other exceptions.
            if e.response["Error"]["Code"] != "ConditionalCheckFailedException":
                raise

        #print("res: ", res)

        # Check if the operation succeeded
        if res != None: #and res["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return res

        # Otherwise this is not the first time the artwork receives data from smartphones.
        # Update event if this is the first time the artwork receives data for the feature
        try:
            res = table.update_item(
                Key={
                    "artworkID": event["artworkID"]
                },
                UpdateExpression="set #fs.#v = #fs.#v + :one, #fs.#vt = #fs.#vt + :u, #fs.#f = :obj",
                ExpressionAttributeNames={
                    "#fs": "featuresStats",
                    "#v" : "views",
                    "#vt": "viewTime",
                    "#f":   event["feature"]
                },
                ExpressionAttributeValues={
                    ":one":  1,
                    ":u":    event["usageTime"],
                    ":obj":  { "views": 1, "viewTime": event["usageTime"] }
                },
                ConditionExpression="attribute_not_exists(#fs.#f.#v)",
                ReturnValues="UPDATED_NEW"
            );
        except botocore.exceptions.ClientError as e:
            # Ignore the ConditionalCheckFailedException, bubble up other exceptions.
            if e.response["Error"]["Code"] != "ConditionalCheckFailedException":
                raise

        # Check if the operation succeeded
        if res != None: #and res["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return res

        # Set if the view must be counted or not
        viewValue = 1 if newView else 0

        # Else this is not the first time the artwork receives data from smartphones for the feature
        res = table.update_item(
            Key={
                "artworkID": event["artworkID"]
            },
            UpdateExpression="set #fs.#v = #fs.#v + :vv, #fs.#vt = #fs.#vt + :u, #fs.#f.#v = #fs.#f.#v + :vv, #fs.#f.#vt = #fs.#f.#vt + :u",
            ExpressionAttributeNames={
                "#fs": "featuresStats",
                "#v" : "views",
                "#vt": "viewTime",
                "#f":   event["feature"]
            },
            ExpressionAttributeValues={
                ":vv":  viewValue,
                ":u":   event["usageTime"]
            },
            ReturnValues="UPDATED_NEW"
        );

        return res
