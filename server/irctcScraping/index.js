
const BASE_URL = "https://www.irctc.co.in"
const HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.0",
    "bmirak": "webbm",
    "content-language": "en",
    "content-type": "application/x-www-form-urlencoded",
    "greq": "1710500405597",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "Referer": "https://www.irctc.co.in/nget/booking/check-train-schedule",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }

const URL_MAPPINGS = {
    TRAIN_SCHEDULE : "/eticketing/protected/mapps1/trnscheduleenquiry/",
    TBS : "/eticketing/protected/mapps1/altAvlEnq/TC",
    FAA : "/eticketing/protected/mapps1/trnscheduleenquiry/",
    TRAIN_LIST : "/eticketing/protected/mapps1/trnscheduleenquiry/",

}
function fetchTrainBetweenStations(src,  dest, doj){
    fetch("https://www.irctc.co.in/eticketing/protected/mapps1/altAvlEnq/TC", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.0",
          "bmirak": "webbm",
          "content-language": "en",
          "content-type": "application/json; charset=UTF-8",
          "greq": "1710500405597",
          "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "Referer": "https://www.irctc.co.in/nget/train-search",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"concessionBooking\":false,\"srcStn\":\"NDLS\",\"destStn\":\"CSMT\",\"jrnyClass\":\"\",\"jrnyDate\":\"20240315\",\"quotaCode\":\"GN\",\"currentBooking\":\"false\",\"flexiFlag\":false,\"handicapFlag\":false,\"ticketType\":\"E\",\"loyaltyRedemptionBooking\":false,\"ftBooking\":false}",
        "method": "POST"
      });
}

function fetchFareAndAvailability(src, dest, doj, className , quota){
    fetch("https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry/12952/20240315/NDLS/MMCT/3A/GN/N", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.0",
          "bmirak": "webbm",
          "content-language": "en",
          "content-type": "application/json; charset=UTF-8",
          "greq": "1710500405597",
          "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "Referer": "https://www.irctc.co.in/nget/booking/train-list",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"paymentFlag\":\"N\",\"concessionBooking\":false,\"ftBooking\":false,\"loyaltyRedemptionBooking\":false,\"ticketType\":\"E\",\"quotaCode\":\"GN\",\"moreThanOneDay\":true,\"trainNumber\":\"12952\",\"fromStnCode\":\"NDLS\",\"toStnCode\":\"MMCT\",\"isLogedinReq\":false,\"journeyDate\":\"20240315\",\"classCode\":\"3A\"}",
        "method": "POST"
      });
}

function fetchTrainList(){

}

function fetchTrainSchedule(trainNo){
    fetch("https://www.irctc.co.in12345", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.0",
          "bmirak": "webbm",
          "content-language": "en",
          "content-type": "application/x-www-form-urlencoded",
          "greq": "1710500405597",
          "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "Referer": "https://www.irctc.co.in/nget/booking/check-train-schedule",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
}


