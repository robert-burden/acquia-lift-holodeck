#pragma strict
import System.Collections.Generic;

var trackableBehaviour:Vuforia.TrackableBehaviour;
var captureSendTracker:CaptureSendTracker;
var touchIdentifier;

function Start () {
   Debug.Log("Start Default Capture Script");	
   trackableBehaviour = GetComponent.<Vuforia.TrackableBehaviour>();
   captureSendTracker = new CaptureSendTracker(this);
   captureSendTracker.trackableName =  trackableBehaviour.TrackableName;
   trackableBehaviour.RegisterTrackableEventHandler( captureSendTracker );
   touchIdentifier = System.Guid.NewGuid().ToString();
}

function Update () {

}

function GetCapture(captureConfig:Boo.Lang.Hash) {
  var defaultCaptureConfig = {
    'event_name':'Content View',
    'event_source':'Web',
    'content_title':'Holodeck content',
    'url':'http://holodeck.com',
    // 'referral_url':'',
    'user_agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3109.0 Safari/537.36',
    //'client_timezone':'240',
    'javascript_version':'1.10.4',
    //'engagement_score':1,
    'content_type':'page',
    //'page_type':'node page',
    //'post_id':'46',
    //'published_date':'1495650236',
    'author':'admin'
  };
  for ( var newEntry in captureConfig ) {
     defaultCaptureConfig[newEntry.Key] = newEntry.Value;
  }
  return defaultCaptureConfig;
};

// Get a payload.
function GetPayload(scenario, payloadConfig:Boo.Lang.Hash) {
  var url = 'http://lift3shay2ws7hd7d5ke.devcloud.acquia-sites.com/host/' + scenario;
  var defaultPayloadConfig = {
    'identity_source':'tracking',
    'identity':'HackathonIdentity00002',
    'touch_identifier':touchIdentifier,
    'url':url,
    'source':'https://lift3assets.dev.lift.acquia.com/latest/lift.js'
  };
    for ( var newEntry in payloadConfig ) {
     defaultPayloadConfig[newEntry.Key] = newEntry.Value;
  }
  return defaultPayloadConfig;
};

function GetJSONOfCaptureMap(capture:Boo.Lang.Hash) {
  var jsonPayload = "{";

  for (  var entry in capture ) {
    if ( jsonPayload != "{" ) {
        jsonPayload += ",";
    }
    jsonPayload += "\"" + entry.Key + "\":\""+entry.Value+"\"";
  }

  jsonPayload += "}";
  return jsonPayload;

}

function GetJSONOfMap(payload:Boo.Lang.Hash) {
  var jsonPayload = "{";

  for (  var entry in payload ) {
    if ( jsonPayload != "{" ) {
        jsonPayload += ",";
    }
    var key = entry.Key;
    var value = entry.Value;
    if ( key == "captures" ) {
       jsonPayload += "\"" + key + "\":";
       var capturesJson = "[";
       var captures:Boo.Lang.Hash[] = value;
       for ( var captureObj in captures ) {
         var capture:Boo.Lang.Hash = captureObj;
         if ( capturesJson != "["  ) {
           capturesJson += ",";
         }
         capturesJson += this.GetJSONOfCaptureMap(capture);
       }
       capturesJson += "]";
       jsonPayload += capturesJson;
    }
    else {

      jsonPayload += "\"" + key + "\":\""+value+"\"";
    }
  }

  jsonPayload += "}";
  return jsonPayload;
}

class CaptureSendTracker extends Networking.DownloadHandlerScript implements Vuforia.ITrackableEventHandler  {
   var trackableName;
   var sendCaptureScript: SendCaptureScript;

   function CaptureSendTracker(thisFile:SendCaptureScript) {
   this.sendCaptureScript = thisFile;
   }

   function OnTrackableStateChanged(previousStatus:Vuforia.TrackableBehaviour.Status,newStatus:Vuforia.TrackableBehaviour.Status) {
      if ( newStatus == Vuforia.TrackableBehaviour.Status.DETECTED ||
           newStatus == Vuforia.TrackableBehaviour.Status.TRACKED ||
           newStatus == Vuforia.TrackableBehaviour.Status.EXTENDED_TRACKED)
      {
         Debug.Log("Found = "+trackableName);
         sendCaptureScript.StartCoroutine( SendCaptureApi(trackableName) );
      }
      else
      {
         Debug.Log("Lost = "+trackableName);
      }
   }

   function SendCaptureApi(tagName) {
         var scenario = 'starbucks';
//         var scenario = 'meeting';
//         var scenario = 'car';

         // Create capture 1 - galleria.
         var captureConfig1 = {
           'event_name':'updatePerson',
           'event_source':'Holodeck',
           'person_udf4':'30',
           'person_udf5':'Male',
           'person_udf6': 'Cambridgeside Galleria Indoors'
         };
         var capture1 = sendCaptureScript.GetCapture(captureConfig1);
         var captures = [ capture1];

         // Get a decision (while posting captures).
         var payloadConfig = {
           // 'identity':'73ESltNk6AEHBVi1nWiApx', // Override by your own if needed.
           'captures': captures
         };
         var payload = sendCaptureScript.GetPayload(scenario, payloadConfig);
  // Configure local caller script.
  var method = 'POST';
  var path = 'https://eu-central-1-rc-decisionapi.dev.lift.acquia.com/decide?account_id=HOLODECK&site_id=holodeck&version=1.10.4';
  // path = "http://httpbin.org/post";
  var body = sendCaptureScript.GetJSONOfMap(payload);
  Debug.Log("Decide request "+body);

  // Create and configure the request.
  var request = new Networking.UnityWebRequest(path, Networking.UnityWebRequest.kHttpVerbPOST);
  // Temp body
  var bodyBytes = System.Text.Encoding.UTF8.GetBytes(body);
  var uH= new Networking.UploadHandlerRaw(bodyBytes);
  uH.contentType= "application/json";
  request.uploadHandler= uH;
  request.SetRequestHeader( "Content-Type", "application/json" );
  request.downloadHandler = new Networking.DownloadHandlerBuffer();
  yield request.Send();
  Debug.Log(request.downloadHandler.text);
   }

   function SendCaptureUnityWebRequest(tagName) {
        var request = new Networking.UnityWebRequest("https://eu-central-1-rc-decisionapi.dev.lift.acquia.com/decide", Networking.UnityWebRequest.kHttpVerbPOST);
        var bytes = System.Text.Encoding.UTF8.GetBytes("{\"captures\":[]}");
        var uH= new Networking.UploadHandlerRaw(bytes);
        uH.contentType= "application/json";
        request.uploadHandler= uH;
        request.SetRequestHeader( "Content-Type", "application/json" );
        request.downloadHandler = new Networking.DownloadHandlerBuffer();
        yield request.Send();
        Debug.Log(request.downloadHandler.text);
   }

}


