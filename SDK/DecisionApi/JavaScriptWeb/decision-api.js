var AcquiaLiftDecisionApi = AcquiaLiftDecisionApi || {};

AcquiaLiftDecisionApi.getCapture = AcquiaLiftDecisionApi.getCapture || function (captureConfig) {
  var defaultCapture = {
    "event_name":"Content View",
    "event_source":"Web",
    "content_title":"Starbucks",
    "url":"http://lift3shay2ws7hd7d5ke.devcloud.acquia-sites.com/host/starbucks",
    "referral_url":"",
    "user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3109.0 Safari/537.36",
    "client_timezone":"240",
    "javascript_version":"1.10.4",
    "engagement_score":1,
    "content_type":"page",
    "page_type":"node page",
    "post_id":"46",
    "published_date":"1495650236",
    "author":"admin"
  };

  return Object.assign(defaultCapture, captureConfig);
};

// Get a payload.
AcquiaLiftDecisionApi.getPayload = AcquiaLiftDecisionApi.getPayload || function (captures) {
  var payload = {
    "identity_source":"tracking",
    "identity":"73ESltNk6AEHBVi1nWiApx",
    "identity_expiry":1558725782774,
    "touch_identifier":"vMKrujuzs4ZK4RCpoNJt4",
    "url":"http://lift3shay2ws7hd7d5ke.devcloud.acquia-sites.com/host/starbucks",
    "source":"https://lift3assets.dev.lift.acquia.com/latest/lift.js"
  };
  payload.captures = captures;
  return payload;
};

// Call decide endpoint.
AcquiaLiftDecisionApi.decide = AcquiaLiftDecisionApi.decide || function (payload) {

  // Configure local caller script.
  var method = 'POST';
  var path = 'https://eu-central-1-rc-decisionapi.dev.lift.acquia.com/decide?account_id=HOLODECK&site_id=holodeck&version=1.10.4';
  var body = JSON.stringify(payload);

  // Create and configure the request.
  var request = new XMLHttpRequest();

  // Define the state change action.
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
//      debugger;

      // Check if the response status is 200 ok.
      if (request.status !== 200) {
        document.getElementById('text-display').innerHTML = 'Problem retrieving data.';
      }

      // Finally, carry out the intended change.
      document.getElementById('text-display').innerHTML = request.response;
    }
  };

  request.open(method, path, true);

  // Send the request.
  request.send(body);
};
