const fetch = require("node-fetch");

// fetch("https://www.irctc.co.in/eticketing/protected/mapps1/altAvlEnq/TC", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.0",
//     "bmirak": "webbm",
//     "content-language": "en",
//     "content-type": "application/json; charset=UTF-8",
//     "greq": "1710919249260",
//     "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Brave\";v=\"122\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "Referer": "https://www.irctc.co.in/nget/train-search",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"concessionBooking\":false,\"srcStn\":\"HYB\",\"destStn\":\"BPL\",\"jrnyClass\":\"\",\"jrnyDate\":\"20240320\",\"quotaCode\":\"GN\",\"currentBooking\":\"false\",\"flexiFlag\":false,\"handicapFlag\":false,\"ticketType\":\"E\",\"loyaltyRedemptionBooking\":false,\"ftBooking\":false}",
//   "method": "POST"
// });
// https://www.irctc.co.in/eticketing/protected/mapps1/altAvlEnq/TC
// // raj 3a
// https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry/22691/20240320/SC/BPL/3A/GN/N
// fetch("https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry/22691/20240320/SC/BPL/3A/GN/N", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.0",
//     "bmirak": "webbm",
//     "content-language": "en",
//     "content-type": "application/json; charset=UTF-8",
//     "greq": "1710919249260",
//     "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Brave\";v=\"122\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "Referer": "https://www.irctc.co.in/nget/booking/train-list",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"paymentFlag\":\"N\",\"concessionBooking\":false,\"ftBooking\":false,\"loyaltyRedemptionBooking\":false,\"ticketType\":\"E\",\"quotaCode\":\"GN\",\"moreThanOneDay\":true,\"trainNumber\":\"22691\",\"fromStnCode\":\"SC\",\"toStnCode\":\"BPL\",\"isLogedinReq\":false,\"journeyDate\":\"20240320\",\"classCode\":\"3A\"}",
//   "method": "POST"
// });

// 2a
// https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry/12437/20240320/SC/BPL/2A/GN/N

exports.getReq = async (req, res, next) => {
  try {
    const data=fetch("https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry/12437/20240320/SC/BPL/2A/GN/N", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.0",
          "bmirak": "webbm",
          "content-language": "en",
          "content-type": "application/json; charset=UTF-8",
          "greq": "1710919249260",
          "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Brave\";v=\"122\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "Referer": "https://www.irctc.co.in/nget/booking/train-list",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"paymentFlag\":\"N\",\"concessionBooking\":false,\"ftBooking\":false,\"loyaltyRedemptionBooking\":false,\"ticketType\":\"E\",\"quotaCode\":\"GN\",\"moreThanOneDay\":true,\"trainNumber\":\"12437\",\"fromStnCode\":\"SC\",\"toStnCode\":\"BPL\",\"isLogedinReq\":false,\"journeyDate\":\"20240320\",\"classCode\":\"2A\"}",
        "method": "POST"
      });
console.log(data);
res.status(200).json({
    message: "Data",
    data: data,
  });      
}
  catch(err){
    console.log(err);
    next(err);
  }
}
